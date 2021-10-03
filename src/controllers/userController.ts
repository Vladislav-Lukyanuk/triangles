import {Camera, Euler} from "three";

export class UserController {
    private readonly _camera: Camera;
    private readonly _domNode: Element;
    private readonly _euler: Euler;
    private readonly _minPolarAngle = 0;
    private readonly _maxPolarAngle = Math.PI;

    constructor(camera: Camera, domNode: Element) {
        this._camera = camera;
        this._domNode = domNode;
        this._euler = (new Euler()).reorder('XYZ');
        debugger

        this._lockPointer();
        this._connect();
    }

    public detObject(): Camera {
        return this._camera;
    }

    protected dispose() {
        this._disconnect();
        this._unlockPointer();
    }

    private _lockPointer() {
        this._domNode.requestPointerLock();
    }

    private _unlockPointer() {
        this._domNode.ownerDocument.exitPointerLock();
    }

    private _connect() {
        this._domNode.addEventListener('mousemove', this._handleMouseMove);
    }

    private _disconnect() {
        this._domNode.removeEventListener('mousemove', this._handleMouseMove);
    }

    private _handleMouseMove(event : MouseEvent) {
        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;

        debugger
        this._euler.setFromQuaternion(this._camera.quaternion);
        this._euler.y -= movementX * 0.002;
        this._euler.x -= movementY * 0.002;

        this._euler.x = Math.max( this._maxPolarAngle, Math.min( this._minPolarAngle, this._euler.x ) );

        this._camera.quaternion.setFromEuler( this._euler );
    }
}