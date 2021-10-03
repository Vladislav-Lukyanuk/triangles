import {Camera, Euler, Quaternion} from "three";

export class UserController {
    private readonly _camera: Camera;
    private readonly _domNode: Element;
    private readonly _euler: Euler;
    private _isLocked: boolean;
    private readonly _minPolarAngle = - Math.PI / 4;
    private readonly _maxPolarAngle = Math.PI / 4;

    constructor(camera: Camera, domNode: Element) {
        this._camera = camera;
        this._domNode = domNode;
        this._euler = (new Euler()).reorder('XYZ');
        this._isLocked = false;

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
        if(this._isLocked) {
            return;
        }

        this._domNode.requestPointerLock();
        this._isLocked = true;
    }

    private _unlockPointer() {
        if(!this._isLocked) {
            return;
        }

        this._domNode.ownerDocument.exitPointerLock();
        this._isLocked = true;
    }

    private _connect() {
        this._domNode.addEventListener('mousemove', this._handleMouseMove.bind(this));
        this._domNode.addEventListener('click', this._lockPointer.bind(this));
    }

    private _disconnect() {
        this._domNode.removeEventListener('mousemove', this._handleMouseMove.bind(this));
        this._domNode.removeEventListener('click', this._lockPointer.bind(this));
    }

    private _handleMouseMove(event : MouseEvent) {
        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;

        debugger
        let quaternion = new Quaternion().copy(this._camera.quaternion);

        const turn = new Quaternion(movementY * 0.002, movementX * 0.002, 0);
        quaternion.multiply(turn);
        quaternion.normalize();

        quaternion.x = Math.min(this._maxPolarAngle, Math.max(this._minPolarAngle, quaternion.x));

        this._camera.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
    }
}