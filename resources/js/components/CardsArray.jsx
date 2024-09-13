const uniqueCardsArray = [
    {
      type: "1",
      image: 'https://img.freepik.com/free-photo/view-funny-animals_23-2151098410.jpg?t=st=1726067497~exp=1726071097~hmac=9f3bd239fd9aa0859ac3b0be902751e6cf35709e17fdfe8bef71f042fb62b6c7&w=1060'
    },
    {
      type: "2",
      image: 'https://img.freepik.com/free-photo/utstallning_181624-17084.jpg?t=st=1726067515~exp=1726071115~hmac=cdead6fdc7daa5d2e8773e614fb65d3e0def275f46dc15ffae14c5d15b2da9ee&w=1480'
    },
    {
      type: "3",
      image: 'https://img.freepik.com/premium-photo/polar-bear-is-playing-with-plant-water_1072138-229459.jpg?w=1800'
    },
    {
      type: "4",
      image: 'https://img.freepik.com/free-photo/watercolor-whale-illustration_23-2151530678.jpg?t=st=1726067595~exp=1726071195~hmac=004fdc342a1bff4929bd463b6b02e3459e711998f453d200988e5e26264ea2b0&w=1800'
    },
    {
      type: "5",
      image: 'https://img.freepik.com/free-photo/view-wild-bison-its-habitat-winter-day_23-2151683825.jpg?t=st=1726067620~exp=1726071220~hmac=477c68114307e46bc54c75b7deaab72fad43f78863df4127cb1a88b4f441563b&w=740'
    },
    {
      type: "6",
      image: 'https://img.freepik.com/free-photo/wild-wolf-nature_23-2151430212.jpg?t=st=1726067633~exp=1726071233~hmac=8e75c7d73c36f3d8c7aeea4a1c677244f74aac23d1202c3419518905f09f08be&w=2000'
    },
    {
        type: "7",
        image: 'https://img.freepik.com/free-photo/beaver-eating-carrot-while-standing-near-water_181624-21368.jpg?t=st=1726067645~exp=1726071245~hmac=de81f24d1a6dbde55407e1639580619277ac961d8157dccfa91fc4e70cf66202&w=1800'
    },
    {
        type: "8",
        image: 'https://img.freepik.com/free-photo/iris-eye-sphere_23-2151643027.jpg?t=st=1726067662~exp=1726071262~hmac=b3a728da779e65dedce57f217c1621553d86b7965b8883c1c81868f370f40d6d&w=1800'
    },
    {
        type: "9",
        image: 'https://img.freepik.com/free-photo/photorealistic-wild-tuna-day-celebration_23-2151307905.jpg?t=st=1726067681~exp=1726071281~hmac=6b129dabc5393cd9b6919bc8459c0314979d41e1b1e4b593178db1670bdb6912&w=2000'
    },
    {
        type: "10",
        image: 'https://img.freepik.com/free-photo/wild-elk-animal-with-winter-nature-landscape_23-2150882450.jpg?t=st=1726067694~exp=1726071294~hmac=91bed39454fa3cf001d4aae97b2f321afc189dfd97219c3e8b8e5f8fbbd1b653&w=2000'
    },
    {
        type: "11",
        image: 'https://img.freepik.com/free-photo/ai-generated-realistic-pictures-seals_23-2150682270.jpg?t=st=1726067719~exp=1726071319~hmac=d7f28e3e568024a864b2548121610b2abb4037065fb5edd57bbad5d4503ea691&w=1800'
    },
    {
        type: "12",
        image: 'https://img.freepik.com/free-photo/cute-foxes-nature_23-2150312800.jpg?t=st=1726067734~exp=1726071334~hmac=689e87c60b4b54adfbf9878b35e0ee20e92f7ee6ac17ded16dcdedd4970d62de&w=740'
    },
    {
        type: "13",
        image: 'https://img.freepik.com/free-photo/eskimo-people-living-extreme-weather-condition_23-2151036533.jpg?t=st=1726067752~exp=1726071352~hmac=62ba61e105a0f02e338663a063cb11a065a4d3b3fd89f1b080f625bb268bc933&w=1800'
    },
    {
        type: "14",
        image: 'https://img.freepik.com/free-photo/view-owl-cold-environment-with-dreamy-aesthetic_23-2151367611.jpg?t=st=1726067775~exp=1726071375~hmac=0153765b6c857aa532b2776762fb2459a32f93b5414d58e64fc141b799e6188e&w=740'
    },
    {
        type: "15",
        image: 'https://img.freepik.com/free-photo/beautiful-whale-crossing-ocean_23-2151494415.jpg?t=st=1726067793~exp=1726071393~hmac=54c80cee93030fe75ee9bb41a3090698ef5507140fa9c883d493c8677c6d4033&w=1800'
    },
    {
        type: "16",
        image: 'https://img.freepik.com/free-photo/vertical-closeup-shot-atlantic-puffin-alaska-blurred-space_181624-24855.jpg?t=st=1726067805~exp=1726071405~hmac=55585c2aaf31cfdf5318e22014c22706bd8992f80175553d3706b88d0d4f3736&w=740'
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
