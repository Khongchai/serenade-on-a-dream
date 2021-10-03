const customTransitionPass = {
  uniforms: {
    uDisplacementTexture: { value: null },
    tDiffuse: {value: null},
  },
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
    varying vec2 vUv;
    void main()
    {
        vec4 color = texture2D(tDiffuse, vUv);
        gl_FragColor = color;
    }
`,
};

export default customTransitionPass;
