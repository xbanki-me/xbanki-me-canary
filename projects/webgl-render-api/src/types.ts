/**
 * Global library type declarations.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.1.0
 *    @version   2.0.0
 *
 */

/**
 * WebGL GLSL valid type literals.
 */
export enum EWebGLTypeDeclaration {
    VOID = 'void',
    BOOL = 'bool',
    INT = 'int',
    FLOAT = 'float',
    BVEC2 = 'bvec2',
    BVEC3 = 'bvec3',
    BVEC4 = 'bvec4',
    IVEC2 = 'ivec2',
    IVEC3 = 'ivec3',
    IVEC4 = 'ivec4',
    VEC2 = 'vec2',
    VEC3 = 'vec3',
    VEC4 = 'vec4',
    MAT2 = 'mat2',
    MAT3 = 'mat3',
    MAT4 = 'mat4',
    SAMPLER2D = 'sampler2D',
    SAMPLERCUBE = 'samplerCube',
}

/**
 * Helper type for string literal enums, which allows using both the enum
 * directly as a type (I.E. `Foo.BAR`) and the string literal itself.
 */
export type K<T extends boolean | number | bigint | string> = `${T}` | T;

/**
 * 4 by 4 matrix.
 */
export type Matrix16<T> = readonly [
    T,
    T,
    T,
    T,
    T,
    T,
    T,
    T,
    T,
    T,
    T,
    T,
    T,
    T,
    T,
    T,
];

/**
 * 3 by 3 matrix.
 */
export type Matrix9<T> = readonly [
    T,
    T,
    T,
    T,
    T,
    T,
    T,
    T,
    T,
];

/**
 * 2 by 2 matrix.
 */
export type Matrix4<T> = readonly [
    T,
    T,
    T,
    T,
];

/**
 * Flat 3 element matrix.
 */
export type Matrix3<T> = readonly [
    T,
    T,
    T,
];

/**
 * Flat 2 element matrix.
 */
export type Matrix2<T> = readonly [
    T,
    T,
];

/**
 * GLSL boolean helper type. Booleans can be expressed as a single bit.
 */
export type GLSLBoolean = boolean | number;

/**
 * Valid variable types for a WebGL uniform.
 */
export type WebGLUniform =
    | Matrix4<GLSLBoolean>
    | Matrix3<GLSLBoolean>
    | Matrix2<GLSLBoolean>
    | Matrix16<number>
    | Matrix9<number>
    | Matrix4<number>
    | Matrix3<number>
    | Matrix2<number>
    | WebGLTexture
    | Float32Array
    | Int32Array
    | boolean
    | number
    | never
    | void;

/**
 * Constrains the declared type for a variable based on the underlying input
 * type, which itself is constrained to `WebGLUniform`.
 *
 * Both `never` and `void` are considered invalid states, which only happen
 * when the input type does not fit the constraints specified.
 */
export type WebGLDeclaration<T extends WebGLUniform> = T extends boolean
    ? EWebGLTypeDeclaration.BOOL
    : T extends number
      ? K<EWebGLTypeDeclaration.INT> | K<EWebGLTypeDeclaration.FLOAT>
      : T extends Matrix2<GLSLBoolean>
        ? K<EWebGLTypeDeclaration.BVEC2>
        : T extends Matrix3<GLSLBoolean>
          ? K<EWebGLTypeDeclaration.BVEC3>
          : T extends Matrix4<GLSLBoolean>
            ? K<EWebGLTypeDeclaration.BVEC4>
            : T extends Matrix2<number>
              ? K<EWebGLTypeDeclaration.VEC2> | K<EWebGLTypeDeclaration.IVEC2>
              : T extends Matrix3<number>
                ? K<EWebGLTypeDeclaration.VEC3> | K<EWebGLTypeDeclaration.IVEC3>
                : T extends Matrix4<number>
                  ?
                        | K<EWebGLTypeDeclaration.VEC4>
                        | K<EWebGLTypeDeclaration.IVEC4>
                  : T extends Float32Array
                    ?
                          | K<EWebGLTypeDeclaration.MAT2>
                          | K<EWebGLTypeDeclaration.MAT3>
                          | K<EWebGLTypeDeclaration.MAT4>
                    : T extends WebGLTexture
                      ?
                            | K<EWebGLTypeDeclaration.SAMPLER2D>
                            | K<EWebGLTypeDeclaration.SAMPLERCUBE>
                      : never | void;
