import Header from '../component/Header.js';

export const meta = () => {
  return [
    { title: 'NICE APP' },
    { property: 'og:title', content: 'VERY NICE APP' },
    { name: 'description', content: 'Suii is smooth' },
  ];
};

const Home = () => {
  return (
    <div className='container mx-auto'>
      <Header />
      <h1 className='text-2xl'>Suii App ! :)</h1>
      <h2 className='text-xl'>Publish your first suii in <a className='text-blue-500' href="https://render.com/">render!</a></h2>
    </div>
  );
};

export default Home;
