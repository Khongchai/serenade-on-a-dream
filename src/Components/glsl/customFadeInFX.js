const customTransitionPass = {
  uniforms: {
    uDisplacementTexture: { value: null },
  },
  vertexShader: `
    void main()
    {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,
  fragmentShader: `
    void main()
    {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`,
};

export default customTransitionPass;
