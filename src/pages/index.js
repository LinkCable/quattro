import * as React from "react"
import { Link, graphql } from "gatsby"

import { Canvas, useFrame, useLoader} from "@react-three/fiber"
import { FontLoader } from "three/src/loaders/FontLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import useHorizontal from '@oberon-amsterdam/horizontal/hook';

import Layout from "../components/layout"
import Seo from "../components/seo"

//import * as THREE from "three"

/*function Text(props) {
  const mesh = React.useRef()
  const font = useLoader(FontLoader, "./helvetiker_regular.json")

  const config = React.useMemo(
   () => ({ font, size: 40, height: 30, curveSegments: 32, bevelEnabled: true, bevelThickness: 6, bevelSize: 2.5, bevelOffset: 0, bevelSegments: 8 }),
   [font]
  )
  return (
    <mesh
      {...props}
      ref = {mesh}
    >
      <textGeometry attach="geometry" args={["hello this is a test", config]} />
      <meshStandardMaterial attach="material" color="orange" />
    </mesh>
  )
}*/

function Dolly(props) {
  useFrame(({ clock, camera }) => {
    camera.position.z = 50 + Math.sin(clock.getElapsedTime()) * 30
  })
  return null
}

function Box(props) {
  const mesh = React.useRef()
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={3}
    >
        <boxGeometry args={[1, .5, 1]} />
        <meshStandardMaterial color="orange" />
    </mesh>
  )
}

const Home = ({ data, location }) =>  {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  const [container, setContainer] = React.useState();

  useHorizontal({ container: container });

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home" />
      <div className="container" ref={ref => {setContainer(ref);}}>
        <h1>
          This is a test of the pacer system.
        </h1>
        <h1>
          This is a test of the pacer system.
        </h1>
        <h1>
          This is a test of the pacer system.
        </h1>
        <h1>
          This is a test of the pacer system.
        </h1>
        <h1>
          This is a test of the pacer system.
        </h1>
        <h1>
          This is a test of the pacer system.
        </h1>
      </div>
      <React.Suspense fallback={null}>
        <Canvas className="canvas" camera={{ fov: 75, position: [0, 0, 70] }}>
          <ambientLight color={0xffffff} />
          <Box position={[0, 0, 0]} />
          <Dolly />
        </Canvas>
      </React.Suspense>
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
