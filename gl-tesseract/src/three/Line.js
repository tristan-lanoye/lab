import * as THREE from 'three'

export default class Line {
	constructor(offset, point1, point2) {
		window.setTimeout(() => {
			this.point1Index = offset + point1
			this.point2Index = offset + point2
			this.point1 = window.app.tesseract.projectedPoints[offset + point1]
			this.point2 = window.app.tesseract.projectedPoints[offset + point2]

			this.create()
		}, 0)
	}

	create() {
		this.material = new THREE.LineBasicMaterial({ color: 0xf1f1f1 })
		this.geometry = new THREE.Geometry();

		this.geometry.vertices.push(new THREE.Vector3(this.point1.x, this.point1.y, this.point1.z))
		this.geometry.vertices.push(new THREE.Vector3(this.point2.x, this.point2.y, this.point2.z))
		this.geometry.dynamic = true

		this.mesh = new THREE.Line(this.geometry, this.material)

		window.app.tesseract.lineMeshes.push({mesh: this.mesh, points: [this.point1Index, this.point2Index]})
		window.app.tesseract.group.add(this.mesh)
	}
}
