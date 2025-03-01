import Header from '../component/Header.js';

export const meta = () => {
  return [
    { title: 'Not Found' },
    {
      property: "og:title",
      content: "404",
    },
    {
      name: 'description',
      content: 'Not found | 404',
    },
  ]
}

const Home = () => {
  return (
    <div>
      <Header />
      <h1>404 Not found :(</h1>
    </div>
  );
};

export default Home;
