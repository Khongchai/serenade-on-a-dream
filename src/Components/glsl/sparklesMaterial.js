export const vertexShader = `
    attribute vec3 aColor;
    attribute float aScale;

    varying vec3 vColor;

    void main()
    {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        gl_PointSize = 2000.0 * aScale;
        gl_PointSize *= (1.0 / - viewPosition.z);

        vColor = aColor;
    }

`;

export const fragmentShader = `

    varying vec3 vColor;

    uniform sampler2D starTexture;

    void main()
    {
        vec4 color = texture2D(starTexture, gl_PointCoord);
        gl_FragColor = vec4(color.rgb * vColor, color.a * 0.6);
    }
`;
