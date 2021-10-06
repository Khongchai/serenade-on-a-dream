const customTransitionPass = {
  vertexShader: `
  varying vec2 vUv;
    void main()
    {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vUv = uv;
    }
`,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform sampler2D uDisplacementTexture;
    uniform sampler2D uSolidColor;

    uniform float dispFactor;

    varying vec2 vUv;
    void main()
    {
        vec4 displacement = texture2D(uDisplacementTexture, vUv);

        float offset = 1.0 - dispFactor;
        float lerpTexture = (displacement.r + 1.0) * 1.2;
        float swipeInDistance = 0.2;
        vec2 distortedPosition = vec2(vUv.x  , vUv.y + dispFactor * lerpTexture);
        vec2 distortedPosition2 = vec2(vUv.x , vUv.y - (offset * lerpTexture) * swipeInDistance);

        vec4 uSolidColor = texture2D(uSolidColor, distortedPosition);
        vec4 scene = texture2D(tDiffuse, distortedPosition2);

        vec4 finalTexture = mix(uSolidColor, scene, dispFactor);

        gl_FragColor = finalTexture;
    }
`,
};

export default customTransitionPass;
