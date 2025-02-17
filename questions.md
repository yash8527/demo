# React Technical Questions and Answers

## 1. Component vs PureComponent
The main difference lies in how they handle updates. PureComponent automatically implements shouldComponentUpdate with a shallow comparison of props and state, while regular Component doesn't perform any comparison by default. This optimization can be beneficial but comes with important caveats.

A common breaking scenario:

```jsx
class ParentComponent extends React.Component {
  state = {
    items: [1, 2, 3]
  }

  handleClick = () => {
    // This mutation won't trigger a re-render in PureComponent
    const items = this.state.items;
    items.push(4);
    this.setState({ items });
  }

  render() {
    return <ChildPureComponent items={this.state.items} />;
  }
}
```

The PureComponent child won't re-render when the array is mutated because the shallow comparison sees the same array reference. The solution is to create a new array reference when updating state.

## 2. Context + shouldComponentUpdate Dangers
This combination can lead to unexpected behavior because shouldComponentUpdate can prevent context updates from reaching child components. When a component returns false from shouldComponentUpdate, it blocks the propagation of new context values to all its children.

```jsx
class MiddleComponent extends React.Component {
  shouldComponentUpdate() {
    // This optimization blocks context updates
    return false;
  }

  render() {
    return <ChildWithContext />;
  }
}
```

The solution typically involves either removing shouldComponentUpdate or carefully implementing it to allow context updates through.

## 3. Passing Information to Parent Components
Three effective patterns for passing data upward:

The callback pattern provides straightforward communication:
```jsx
function ChildComponent({ onDataUpdate }) {
  return (
    <button onClick={() => onDataUpdate('new data')}>
      Update Parent
    </button>
  );
}
```

Ref forwarding enables direct access to child methods:
```jsx
const ChildComponent = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    getData: () => 'child data'
  }));
  return <div>Child</div>;
});
```

State management libraries handle complex data flows:
```jsx
const DataContext = React.createContext();

function ChildComponent() {
  const { updateData } = React.useContext(DataContext);
  return (
    <button onClick={() => updateData('new value')}>
      Update
    </button>
  );
}
```

## 4. Preventing Component Re-renders
React.memo prevents unnecessary renders through props comparison:

```jsx
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  return <div>{data.map(item => <span key={item.id}>{item.value}</span>)}</div>;
});
```

The useMemo hook optimizes expensive computations:
```jsx
function DataProcessor({ items }) {
  const processedData = React.useMemo(() => {
    return items.map(item => expensiveOperation(item));
  }, [items]);

  return <div>{processedData}</div>;
}
```

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment (`<React.Fragment>` or `<>...</>`) allows grouping multiple elements without adding an extra DOM node.

Example:

```jsx
return (
  <>
    <h1>Title</h1>
    <p>Description</p>
  </>
);
```

### Breaking scenario:

If an attribute (e.g., `key` in lists) is required, fragments won’t support it unless using `React.Fragment` explicitly:

```jsx
const items = ["Item1", "Item2"];
return (
  <>
    {items.map((item, index) => (
      <React.Fragment key={index}>
        <p>{item}</p>
      </React.Fragment>
    ))}
  </>
);
```


## 6. Higher-Order Component (HOC) Examples
Three practical HOC patterns:

Authentication wrapper:
```jsx
const withAuth = (WrappedComponent) => {
  return function WithAuthComponent(props) {
    const isAuthenticated = useAuth();
    
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    return <WrappedComponent {...props} />;
  };
};
```

Loading state handler:
```jsx
const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    
    return <WrappedComponent {...props} />;
  };
};
```

Data fetching wrapper:
```jsx
const withData = (WrappedComponent, dataSource) => {
  return function WithDataComponent(props) {
    const [data, setData] = useState(null);
    
    useEffect(() => {
      const fetchData = async () => {
        const result = await dataSource();
        setData(result);
      };
      fetchData();
    }, []);
    
    return <WrappedComponent data={data} {...props} />;
  };
};
```

## 7. Exception Handling in Different Patterns
Each pattern has its specific use case:

Promises provide clean chaining:
```javascript
fetchData()
  .then(data => processData(data))
  .catch(error => handleError(error))
  .finally(() => cleanup());
```

Callbacks maintain traditional error handling:
```javascript
fetchData((error, data) => {
  if (error) {
    handleError(error);
    return;
  }
  processData(data);
});
```

Async/await offers synchronous-style error handling:
```javascript
async function getData() {
  try {
    const data = await fetchData();
    return processData(data);
  } catch (error) {
    handleError(error);
  } finally {
    cleanup();
  }
}
```

## 8. setState Arguments and Asynchronous Behavior
setState accepts two arguments: the update value and an optional callback. Its asynchronous nature enables performance optimization through batching:

```javascript
// Simple value update
this.setState({ count: 5 }, () => {
  console.log('State updated');
});

// Function update for accessing previous state
this.setState((prevState, props) => ({
  count: prevState.count + 1
}), () => {
  console.log('State updated');
});
```

## 9. Class to Function Component Migration Steps
Key steps in the migration process:

Converting the basic structure:
```javascript
// Class component
class MyComponent extends React.Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}

// Function component
function MyComponent(props) {
  return <div>{props.name}</div>;
}
```

State conversion:
```javascript
// Before: Class state
constructor(props) {
  super(props);
  this.state = { count: 0 };
}

// After: useState hook
const [count, setCount] = useState(0);
```

Lifecycle methods become useEffect:
```javascript
// Before: Lifecycle method
componentDidMount() {
  fetchData();
}

// After: useEffect hook
useEffect(() => {
  fetchData();
}, []);
```

## 10. Component Styling Approaches
Various effective styling methods:

CSS Modules for scoped styling:
```jsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.button}>Click me</button>;
}
```

Styled Components for dynamic styles:
```jsx
const StyledButton = styled.button`
  background-color: ${props => props.primary ? 'blue' : 'gray'};
  color: white;
  padding: 10px;
`;
```

Tailwind CSS for utility-first styling:
```jsx
function Button() {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded">
      Click me
    </button>
  );
}
```

## 11. Server HTML String Rendering
Safe HTML rendering requires proper sanitization:

```jsx
import DOMPurify from 'dompurify';

function SafeHTML({ htmlContent }) {
  const sanitizedContent = DOMPurify.sanitize(htmlContent);
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
    />
  );
}
```

This approach balances functionality with security, preventing XSS attacks while allowing necessary HTML rendering.
