export const vertexShader = `
    
    attribute vec3 aColor;
    varying vec3 vColor;
    varying vec2 vUv;

    void main()
    {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        gl_PointSize = 2000.0;
        gl_PointSize *= (1.0 / - viewPosition.z);

        vColor = aColor;
        vUv = uv;
    }

`;

export const fragmentShader = `

    varying vec3 vColor;
    varying vec2 vUv;

    uniform sampler2D starTexture;

    void main()
    {
        vec4 color = texture2D(starTexture, vUv);
        gl_FragColor = vec4(vColor, 1.0);
    }
`;
