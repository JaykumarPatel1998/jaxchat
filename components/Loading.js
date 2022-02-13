import {CubeGrid} from 'better-react-spinkit';

function Loading() {
  return (
      <center style={{
          display: 'grid',
          placeItems: 'center',
          height: '100vh',
          background: 'rgba(255,255,255,0.3)',
      }}>
        <div>
            <img 
            src="/jax.png" 
            alt="" 
            height={200}
            style={{
                marginBottom: 10,
                background: '#905050',
            }}
            />
            <CubeGrid color='#905050' size={60}/>
        </div>
      </center>
    
  )
}

export default Loading