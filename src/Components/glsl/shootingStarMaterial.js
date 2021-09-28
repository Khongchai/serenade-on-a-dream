export const vertexShader = `
    void main()
    {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }

`;

export const fragmentShader = `

    void main()
    {
        gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
    }
`;
