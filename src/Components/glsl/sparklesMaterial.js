export const vertexShader = `
    attribute vec3 aColor;
    attribute float aScale;

    varying vec3 vColor;
    varying float vPointSize;

    uniform float uPixelRatio;
    uniform float uTime;

    void main()
    {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);


        gl_PointSize = 2000.0 * aScale * uPixelRatio;
        modelPosition.y = modelPosition.y - (gl_PointSize * uTime * 0.0002);

        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;

        gl_PointSize *= (1.0 / - viewPosition.z);
        gl_Position = projectionPosition;

        vColor = aColor;
        vPointSize = gl_PointSize;
    }

`;

export const fragmentShader = `

    varying vec3 vColor;
    varying float vPointSize;

    uniform sampler2D starTexture;
    uniform float uTime;

    void main()
    {
        
        float theta = uTime * (vPointSize * 0.005);
        mat2 rotationMatrix = mat2(
            cos(theta), -sin(theta),
            sin(theta), cos(theta)
        );
        vec2 modifiedPointCoord = ((gl_PointCoord - vec2(0.5)) * (rotationMatrix)) + vec2(0.5);
        
        vec4 color = texture2D(starTexture, modifiedPointCoord);
        gl_FragColor = vec4(color.rgb * vColor, color.a * 0.6);
    }
`;
