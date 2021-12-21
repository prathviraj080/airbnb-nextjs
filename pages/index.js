import houses from "../houses";
import House from "../components/House";
import Layout from "../components/Layout";
import Cookies from 'cookies';
import { useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';

const content = (
  <div>
    <h2>Places to stay</h2>
    <div className="houses">
      {houses.map((house, index) => {
        return (<House key={index} {...house} />);
      })}
    </div>


    <style jsx>{`
    .houses {
      display: grid;
      grid-template-columns: 49% 49%;
      grid-template-rows: 300px 300px;
      grid-gap: 2%;
    }
  `}</style>
  </div>
)

export default function Home({ nextbnb_session }) {
  const setLoggedIn = useStoreActions((actions) => actions.login.setLoggedIn);
  useEffect(() => {
    if (nextbnb_session) {
      setLoggedIn(true)
    }
  }, [nextbnb_session]);
  
  return <Layout content={content} />;
}

export async function getServerSideProps({ req, res, query }) {
  const cookies = new Cookies(req, res);
  const nextbnb_session = cookies.get('nextbnb_session');

  return {
    props: {
      nextbnb_session: nextbnb_session || null
    }
  }
}