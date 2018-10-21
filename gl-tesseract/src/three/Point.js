import * as THREE from 'three'

export default class Point {
	constructor(x, y, z) {
		this.x = x
		this.y = y
		this.z = z

		window.setTimeout(() => {
			this.create()
		}, 0)
	}

	create() {
		this.geometry = new THREE.SphereGeometry(.05, 32, 32)
		this.material = new THREE.MeshBasicMaterial({ color: 0xf1f1f1 })
		this.mesh = new THREE.Mesh(this.geometry, this.material)

		this.mesh.position.x = this.x
		this.mesh.position.y = this.y
		this.mesh.position.z = this.z

		window.app.tesseract.pointMeshes.push(this.mesh)
		window.app.tesseract.group.add(this.mesh)
	}
}
