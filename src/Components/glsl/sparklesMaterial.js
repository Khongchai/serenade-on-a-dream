export const vertexShader = `
    attribute vec3 aColor;
    attribute float aScale;

    varying vec3 vColor;
    varying float vPointSize;

    uniform float uPixelRatio;
    uniform float uTime;

    void main()
    {
        gl_PointSize = 2000.0 * aScale * uPixelRatio;

        vColor = aColor;
        vPointSize = gl_PointSize;

        vec4 localSpace = vec4(position, 1.0);
        float wiggleDifference = gl_PointSize * 3.0;
        float amplitude = 0.00645;
        float moveY = (sin((uTime * wiggleDifference) * 0.00005)) * amplitude;
        localSpace.y = localSpace.y + moveY;
        vec4 worldPosition = modelMatrix * localSpace;

        vec4 viewPosition = viewMatrix * worldPosition;

        vec4 projectionPosition = projectionMatrix * viewPosition;

        gl_PointSize *= (1.0 / - viewPosition.z);
        gl_Position = projectionPosition;
 
    }

`;

export const fragmentShader = `

    varying vec3 vColor;
    varying float vPointSize;

    uniform sampler2D starTexture;
    uniform float uTime;

    void main()
    {
        
        float theta = uTime * (vPointSize * 0.00005);
        mat2 rotationMatrix = mat2(
            cos(theta), -sin(theta),
            sin(theta), cos(theta)
        );
        vec2 modifiedPointCoord = ((gl_PointCoord - vec2(0.5)) * (rotationMatrix)) + vec2(0.5);
        
        vec4 color = texture2D(starTexture, modifiedPointCoord);
        gl_FragColor = vec4(color.rgb * vColor, color.a * 0.6);
    }
`;
