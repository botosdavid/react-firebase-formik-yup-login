import { Canvas,useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Suspense, useRef } from 'react';
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import Loading from './Loading';

const Scene = () => {
    const mesh = useRef();
    const materials = useLoader(MTLLoader, "/uploads-files-2763799-Tesla+Model+obj/Tesla Model.mtl");
    const obj = useLoader(OBJLoader, "/uploads-files-2763799-Tesla+Model+obj/Tesla Model.obj", (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    });
  
    useFrame(() => {
        mesh.current.rotation.y += 0.01;
    })

    return (
        <mesh ref={mesh}>
            <primitive 
                object={obj} 
                scale={1.2} 
                position={[0,-1.5,0]} />
        </mesh>
    )
}

const Model = () => {
    
    return (
        <Suspense fallback={<Loading />} >
            <Canvas style={{height: '60vh', width: '45vw'}} camera={{ fov: 10, position: [-25, 15, 12]}}>
                <pointLight color="white" intensity={1} position={[-10, -5, 30]} />
                <pointLight color="white" intensity={1} position={[20, 20, -30]} />
                <pointLight color="white" intensity={1} position={[-20, -10, 0]} />
                <pointLight color="white" intensity={1} position={[-20, 0, 0]} />
                <ambientLight color="white" intensity={0.5} />
                <Scene />
            </Canvas>
        </Suspense>
    )
}

export default Model;