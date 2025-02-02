export function setupCounter(element: HTMLButtonElement) {
    let count = 0;
    const setCounter = (count: number) => {
      element.innerText = `Count: ${count}`;
    };
    element.addEventListener('click', () => setCounter(++count));
    setCounter(count);
  }
  