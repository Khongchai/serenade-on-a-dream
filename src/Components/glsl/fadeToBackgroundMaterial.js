export const vertexShader = `
    varying vec2 vUv;

    void main()
    {
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

        vUv = uv;
    }

`;

export const fragmentShader = `

    #define PI 3.1415926538

    uniform sampler2D uTexture;
    uniform float uOpacity;

    varying vec2 vUv;
    

    void main()
    {
        vec4 textureColor = texture2D(uTexture, vUv);

        float weight = 1.01;

        float taper = 2.0;

        float edgeLocationX = -pow((2.0 * vUv.x * weight - weight), 8.0) + 1.0;
        float fadedX = textureColor.a * max(edgeLocationX, 0.0);

        float edgeLocationY = -pow(2.0 * vUv.y * weight - weight, 8.0) + 1.0;
        float allFaded = fadedX * max(edgeLocationY, 0.0);

        gl_FragColor = vec4(textureColor.rgb, allFaded * uOpacity);
    }
`;
