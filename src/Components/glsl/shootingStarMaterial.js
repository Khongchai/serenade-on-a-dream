export const vertexShader = `
    varying vec2 vUv;
    void main()
    {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * viewMatrix * worldPosition;

        vUv = uv;
    }

`;

export const fragmentShader = `

    uniform sampler2D starTexture;
    uniform vec3 uColor;
    uniform float uTime;

    varying vec2 vUv;

    void main()
    {
        float k = 5.0;
        float randValueForTwinkle = (sin(uTime * 0.0083) + k - 1.0) / k;
        vec4 color = texture2D(starTexture, vUv);
        gl_FragColor = vec4(color.xyz * uColor.xyz, randValueForTwinkle);
    }
`;
