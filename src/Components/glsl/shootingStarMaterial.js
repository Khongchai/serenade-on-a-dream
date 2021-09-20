export const vertexShader = `

    uniform float uTime;

    void main()
    {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);


        gl_Position = projectionMatrix * viewMatrix * modelPosition;
        gl_PointSize = 2.0;
    }

`;

export const fragmentShader = `

    uniform float uTime;

    void main()
    {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`;
