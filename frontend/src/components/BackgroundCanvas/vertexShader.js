// language=GLSL
const vertexShader = `
    uniform float u_time;
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform vec3 u_Color[5];
    varying vec3 vColor;
    uniform vec2 pixels;
    float PI = 3.141592653589793238;

    // Simplex 3D Noise 
    // by Ian McEwan, Ashima Arts
    //
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    
    float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    
    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
    
    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    
    //  x0 = x0 - 0. + 0.0 * C 
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;
    
    // Permutations
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    
    // Gradients
    // ( N*N points uniformly over a square, mapped onto an octahedron.)
    float n_ = 1.0/7.0; // N=7
    vec3  ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    
    //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
    }
    
    // end simplex noise
    
    // Main function. This is the entry point of the shader code.
    void main() {
        
        // Compute the coordinates for the noise calculation.
        // The values 3. and 4. are scaling factors for the UV coordinates of the texture.
        vec2 noiseCoord = uv*vec2(3., 4.);
        
        // Compute tilt. The "-0.8*uv.y" gives a tilt towards the lower side of the texture.
        // You can change this to control the tilt amount.
        float tilt = -0.8*uv.y;
        
        // Compute incline. The "0.1*uv.x" gives a small incline to the right of the texture.
        // You can change this to control the incline amount.
        float incline = uv.x*0.1;
        
        // Compute offset. The "0.5*incline*mix(-.25, 0.25, uv.y)" gives an offset to the shape.
        // You can change the arguments of the mix function to control the amount and direction of the offset.
        float offset = 0.5*incline*mix(-.25, 0.25, uv.y);
        
        // Compute noise. The noise is based on a 3D simplex noise function.
        // You can change the multipliers of the arguments to control the noise frequency and speed.
        float noise = snoise(vec3(noiseCoord.x + u_time * 3., noiseCoord.y, u_time * 10.));
        
        // Compute the position of the current vertex by adding the original position,
        // noise applied on *Z* axis, tilt, incline and offset.
        vec3 pos = vec3(
                position.x, 
                position.y, 
                position.z + noise * 0.3 + tilt + incline + offset
            ); 
        
        // Here you are resetting the noise in case it was replaced as a result of shifting in *Z* axis.
        noise = max(0.,noise);

        // Set the color of the vertex to the 5th value of the color matrix.
        vColor = u_Color[4];
        
        // Loop over each of the first 4 entries in the color matrix.
        // Compute and mix a new color based on a different set of noise data.
        for(int i = 0; i < 4; i++){
            float noiseFlow = 5. + float(i) * 0.3;
            float noiseSpeed = 10. + float(i) * 0.3;
            float noiseSeed = 1. + float(i) * 10.;
            vec2 noiseFreq = vec2(0.3, 0.4);
            
            // noiseFloor and noiseCeil are used to control the range of the noise.
            float noiseFloor = 0.1;
            float noiseCeil = 0.6 + float(i) * 0.07;
            
            float noise = smoothstep(noiseFloor, noiseCeil, snoise(vec3(
                    noiseCoord.x*noiseFreq.x + u_time * noiseFlow,
                    noiseCoord.y*noiseFreq.y, 
                    u_time * noiseSpeed + noiseSeed
                 )
             ));
            
            // Mix the colors based on the noise computed.
            vColor = mix(vColor, u_Color[i], noise);
        }
        
        // Set the UV coordinates of the fragment.
        vUv = uv;
        // Transform the computed position into clipspace and assign it to gl_Position.
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        
    }
`;

export default vertexShader;
