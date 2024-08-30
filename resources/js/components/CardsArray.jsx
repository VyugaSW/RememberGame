const uniqueCardsArray = [
    {
      type: "1",
      image: ''
    },
    {
      type: "2",
      image: ''
    },
    {
      type: "3",
      image: ''
    },
    {
      type: "4",
      image: ''
    },
    {
      type: "5",
      image: ''
    },
    {
      type: "6",
      image: ''
    },
    {
        type: "7",
        image: ''
    },
    {
        type: "8",
        image: ''
    },
    {
        type: "9",
        image: ''
    },
    {
        type: "10",
        image: ''
    },
    {
        type: "11",
        image: ''
    },
    {
        type: "12",
        image: ''
    },
    {
        type: "13",
        image: ''
    },
    {
        type: "14",
        image: ''
    },
    {
        type: "15",
        image: ''
    },
    {
        type: "16",
        image: ''
    },   
];
  
export function shuffleCards(array){
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

export default uniqueCardsArray;
