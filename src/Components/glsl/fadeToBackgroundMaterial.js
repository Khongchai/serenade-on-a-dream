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
    uniform vec3 backgroundColor;

    varying vec2 vUv;

    void main()
    {
        vec4 textureColor = texture2D(uTexture, vUv);

        float edgeLocation = abs(cos((PI * (2.0 * vUv.x + 1.0)) / 2.0));

        vec3 newUv = mix(backgroundColor, textureColor.rgb, edgeLocation);
        gl_FragColor = vec4(newUv, textureColor.a);
    }
`;
