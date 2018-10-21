import * as THREE from 'three'
import * as math from 'mathjs'

import Point from './Point'
import Line from './Line'

const matrixVecMult3 = (m, v) => matrixToVec3(math.multiply(m, vec4ToMatrix(v)))
const matrixVecMult4 = (m, v) => matrixToVec4(math.multiply(m, vec4ToMatrix(v)))
const matrixToVec3 = (m) => new THREE.Vector3(m[0][0], m[1][0], m[2][0])
const matrixToVec4 = (m) => new THREE.Vector4(m[0][0], m[1][0], m[2][0], m[3][0])
const vec4ToMatrix = (v) => [[v.x], [v.y], [v.z], [v.w]]

export default class Tesseract {
	/**
	 * @description Constructor
	 */
	constructor() {
		this.points = [
			new THREE.Vector4(-1, -1, -1, 1),
			new THREE.Vector4(1, -1, -1, 1),
			new THREE.Vector4(1, 1, -1, 1),
			new THREE.Vector4(-1, 1, -1, 1),
			new THREE.Vector4(-1, -1, 1, 1),
			new THREE.Vector4(1, -1, 1, 1),
			new THREE.Vector4(1, 1, 1, 1),
			new THREE.Vector4(-1, 1, 1, 1),
			new THREE.Vector4(-1, -1, -1, -1),
			new THREE.Vector4(1, -1, -1, -1),
			new THREE.Vector4(1, 1, -1, -1),
			new THREE.Vector4(-1, 1, -1, -1),
			new THREE.Vector4(-1, -1, 1, -1),
			new THREE.Vector4(1, -1, 1, -1),
			new THREE.Vector4(1, 1, 1, -1),
			new THREE.Vector4(-1, 1, 1, -1),
		]
		this.projectedPoints = []

		this.pointMeshes = []
		this.lineMeshes = []

		this.angle = 0
		this.distance = 2

		this.group = new THREE.Group()
		this.group.rotation.x = Math.PI / 2
		// this.group.rotation.y = 0.25
		// this.group.rotation.z = 0.25

		this.init()
		this.drawPoints()
		this.drawLines()
	}

	/**
     * @description Initial Tesseract
     */
	init() {
		window.app.scene.add(this.group)
		window.app.time.on('tick', () => {
			// this.group.rotation.y += 0.005
		})

		this.loop = this.loop.bind(this)
		this.loop()
	}

	/**
	 * @description Get 4D Vector Projection in 3D Space
	 * @param {Object} v
	 * @param {Integer} i
	 */
	getProjection(v, i) {
		const w = 1 / (this.distance - v.w)

		const projectionMatrix = [
			[w, 0, 0, 0],
			[0, w, 0, 0],
			[0, 0, w, 0]
		]

		return this.projectedPoints[i] = matrixVecMult3(projectionMatrix, v)
	}

	getRotation(v) {
		const rotationMatrixXY = [
			[math.cos(this.angle), -math.sin(this.angle), 0, 0],
			[math.sin(this.angle), math.cos(this.angle), 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 1]
		]

		const rotationMatrixZW = [
			[1, 0, 0, 0],
			[0, 1, 0, 0],
			[0, 0, math.cos(this.angle), -math.sin(this.angle)],
			[0, 0, math.sin(this.angle), math.cos(this.angle)]
		]

		const rotatedZ = matrixVecMult4(rotationMatrixXY, v)
		return matrixVecMult4(rotationMatrixZW, rotatedZ)
	}

	/**
     * @description Loop
     */
	loop() {
		this.angle += 0.015

		this.looper = window.requestAnimationFrame(this.loop)

		// if(this.angle < 0.1) {
			for(let i = 0; i < this.points.length; i++) {
				const rotatedPoint = this.getRotation(this.points[i])
				this.getProjection(rotatedPoint, i)
			}
		// }


		if(this.pointMeshes.length != 0) {
			for(let i = 0; i < this.pointMeshes.length; i++) {
				if(this.angle < 0.1) {
					// console.log(this.lineMeshes.length)
					console.log(this.pointMeshes[i].position.z)
				}
				this.pointMeshes[i].position.x = this.projectedPoints[i].x
				this.pointMeshes[i].position.y = this.projectedPoints[i].y
				this.pointMeshes[i].position.z = this.projectedPoints[i].z
			}
		}

		if(this.lineMeshes.length != 0) {
			for(let i = 0; i < this.lineMeshes.length; i++) {
				this.lineMeshes[i].mesh.geometry.vertices[0] = this.projectedPoints[this.lineMeshes[i].points[0]]
				this.lineMeshes[i].mesh.geometry.vertices[1] = this.projectedPoints[this.lineMeshes[i].points[1]]
				this.lineMeshes[i].mesh.geometry.verticesNeedUpdate = true
			}
		}
	}

	/**
	 * @description Draw Points
	 */
	drawPoints() {
		for(let i = 0; i < this.points.length; i++) {
			const projectedPoint = this.getProjection(this.points[i], i)

			new Point(projectedPoint.x, projectedPoint.y, projectedPoint.z)
		}
	}

	/**
     * @description Draw Lines
     */
	drawLines() {
		for(let i = 0; i < 4; i++) {
			new Line(0, i, (i + 1) % 4)
			new Line(0, i + 4, ((i + 1) % 4) + 4)
			new Line(0, i, i + 4)

			new Line(8, i, (i + 1) % 4)
			new Line(8, i + 4, ((i + 1) % 4) + 4)
			new Line(8, i, i + 4)
		}

		for (let i = 0; i < 8; i++) {
			new Line(0, i, i + 8)
		}
	}

    /**
     * @description Stop Loop
     */
    stop()
    {
        window.cancelAnimationFrame(this.looper)
    }
}
