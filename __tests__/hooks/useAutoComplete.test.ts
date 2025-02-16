// import { act } from 'react-dom/test-utils';
// import { useState, useEffect } from 'react';
// import { create, act as rendererAct } from 'react-test-renderer';
// import useAutoComplete from '../../src/hooks/useAutoComplete';
// import useDebounce from '../../src/hooks/useDebounce';

// // Mock the useDebounce hook
// jest.mock('../../src/hooks/useDebounce', () => jest.fn((value) => value));

// describe('useAutoComplete', () => {
//     const allData = ['apple', 'banana', 'grape', 'orange', 'pineapple'];

//     const TestComponent = ({ inputValue }) => {
//         const autoComplete = useAutoComplete(allData);
//         useEffect(() => {
//             autoComplete.setInputValue(inputValue);
//         }, [inputValue]);
//         return autoComplete;
//     };

//     it('should return empty suggestions when inputValue is empty', async () => {
//         let result;
//         await rendererAct(async () => {
//             const testRenderer = create(<TestComponent inputValue="" />);
//             result = testRenderer.root.children[0];
//         });

//         expect(result.filteredSuggestions).toEqual([]);
//         expect(result.isLoading).toBe(false);
//     });

//     it('should return filtered suggestions when inputValue matches some items', async () => {
//         let result;
//         await rendererAct(async () => {
//             const testRenderer = create(<TestComponent inputValue="ap" />);
//             result = testRenderer.root.children[0];
//         });

//         expect(result.filteredSuggestions).toEqual(['apple', 'grape', 'pineapple']);
//         expect(result.isLoading).toBe(false);
//     });

//     it('should return empty suggestions when inputValue does not match any items', async () => {
//         let result;
//         await rendererAct(async () => {
//             const testRenderer = create(<TestComponent inputValue="xyz" />);
//             result = testRenderer.root.children[0];
//         });

//         expect(result.filteredSuggestions).toEqual([]);
//         expect(result.isLoading).toBe(false);
//     });

//     it('should handle isLoading state correctly', async () => {
//         let result;
//         await rendererAct(async () => {
//             const testRenderer = create(<TestComponent inputValue="ap" />);
//             result = testRenderer.root.children[0];
//         });

//         expect(result.isLoading).toBe(true);

//         await rendererAct(async () => {
//             const testRenderer = create(<TestComponent inputValue="ap" />);
//             result = testRenderer.root.children[0];
//         });

//         expect(result.isLoading).toBe(false);
//     });
// });