import { useEffect, useRef } from 'react';
import CssBreadcrumbs from 'src/components/Breadcrumb/CssBreadcrumbs';
import ReactSeo from 'src/components/ReactSeo';
import { ROUTE } from 'src/configs/constance';
import useLocalTranslate from 'src/hooks/useLocalTranslate';
import * as THREE from 'three';

export default function Animation3d() {
  const refContainer = useRef<HTMLDivElement>(null);
  const { t } = useLocalTranslate();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (refContainer.current) refContainer.current.appendChild(renderer.domElement);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return (
    <>
      <ReactSeo title={`${t('animation')} 3D`} />
      <CssBreadcrumbs
        configs={[
          { label: t('animation'), link: ROUTE.ANIMATION },
          { label: '3D', formatter: (value) => value },
        ]}
        mb={2}
      />
      <div ref={refContainer} />
    </>
  );
}
