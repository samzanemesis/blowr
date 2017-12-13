declare namespace Ammo {
	
		export class btDefaultCollisionConfiguration {}
	
		export class btCollisionDispatcher {
			constructor(c: btDefaultCollisionConfiguration);
		}
	
		export class btVector3 {
			x(): number;
			y(): number;
			z(): number;
			constructor(x: number, y: number, z: number);
		}
	
		export class btAxisSweep3 {
			constructor(min: btVector3, max: btVector3);
		}
	
		export class btSequentialImpulseConstraintSolver {}
	
		export class btDiscreteDynamicsWorld {
			constructor(a: btCollisionDispatcher, b: btAxisSweep3, c: btSequentialImpulseConstraintSolver, d: btDefaultCollisionConfiguration);
			setGravity(v: btVector3);
			addRigidBody(b: btRigidBody);
			stepSimulation(n1: number, n2: number);
		}
	
		export class btConvexShape {
			calculateLocalInertia(n: number, v: btVector3);
			setMargin(n: number);
		}
	
		export class btBoxShape extends btConvexShape {
			constructor(v: btVector3);
		}
	
		export class btSphereShape extends btConvexShape {
			constructor(radius: number);
		}
		
		export class btCylinderShape extends btConvexShape {
			constructor(halfExtents: btVector3);
		}

		export class btConeShape extends btConvexShape {
			constructor(radius: number, height: number);
		}

		export class btCapsuleShape extends btConvexShape {
			constructor(radius: number, height: number);
		}


		export class btRigidBody {
			constructor(info: btRigidBodyConstructionInfo);
			setActivationState(s: number);
			getMotionState(): btMotionState;
			getWorldTransform(transform: btTransform);

			proceedToTransform (newTrans: btTransform);
			predictIntegratedTransform (step: number, predictedTransform: btTransform);
			saveKinematicState ( step: number);
			applyGravity ();
			setGravity (acceleration: btVector3);
			getGravity (): btVector3;
			setDamping ( lin_damping: number,  ang_damping: number);
			getLinearDamping () : number;
			getAngularDamping () : number;
			getLinearSleepingThreshold () : number;
			getAngularSleepingThreshold () : number;
			applyDamping ( timeStep: number);
			getCollisionShape (): btCollisionShape;
			getCollisionShape (): btCollisionShape;
			setMassProps ( mass: number,  inertia: btVector3);
			getLinearFactor (): btVector3;
			setLinearFactor ( linearFactor: btVector3);
			getInvMass () : number;
			getInvInertiaTensorWorld (): btMatrix3x3;
			integrateVelocities ( step: number);
			setCenterOfMassTransform ( xform: btTransform);
			applyCentralForce ( force: btVector3);
			getTotalForce (): btVector3;
			getTotalTorque (): btVector3;
			getInvInertiaDiagLocal (): btVector3;
			setInvInertiaDiagLocal ( diagInvInertia: btVector3);
			setSleepingThresholds ( linear: number,  angular: number);
			applyTorque ( torque: btVector3);
			applyForce ( force: btVector3,  rel_pos: btVector3);
			applyCentralImpulse ( impulse: btVector3);
			applyTorqueImpulse ( torque: btVector3);
			applyImpulse ( impulse: btVector3,  rel_pos: btVector3);
			clearForces ();
			updateInertiaTensor ();
			getCenterOfMassPosition (): btVector3;
			getOrientation (): btQuaternion;
			getCenterOfMassTransform (): btTransform;
			getLinearVelocity (): btVector3;
			getAngularVelocity (): btVector3;
			setLinearVelocity ( lin_vel: btVector3);
			setAngularVelocity ( ang_vel: btVector3);
			getVelocityInLocalPoint ( rel_pos: btVector3): btVector3;
			translate ( v: btVector3);
			getAabb ( aabbMin: btVector3,  aabbMax: btVector3);
			computeImpulseDenominator (  pos: btVector3 ,  normal: btVector3): number;
			computeAngularImpulseDenominator ( axis: btVector3 ): number;
			updateDeactivation ( timeStep: number);
			wantsSleeping (): Boolean;
			getBroadphaseProxy (): btBroadphaseProxy;
			getBroadphaseProxy (): btBroadphaseProxy;
			setNewBroadphaseProxy ( broadphaseProxy: btBroadphaseProxy);
			getMotionState (): btMotionState;
			getMotionState (): btMotionState;
			setMotionState ( motionState: btMotionState);
			setAngularFactor ( angFac: btVector3);
			setAngularFactor ( angFac: number);
			getAngularFactor (): btVector3;
			isInWorld (): Boolean;
			checkCollideWithOverride ( co: btCollisionObject) : Boolean;
			addConstraintRef ( c: btTypedConstraint);
			removeConstraintRef ( c: btTypedConstraint);
			getConstraintRef (index: number): btTypedConstraint;
			getNumConstraintRefs (): number;;
			setFlags (flags: number);
			getFlags(): number;;
			computeGyroscopicForce ( maxGyroscopicForce: number): btVector3 ;
			calculateSerializeBufferSize(): Number;
			serialize (dataBuffer, serializer: btSerializer): Number;	 //Actually a char
			serializeSingleObject (serializer: btSerializer);
		}
	
		export class btQuaternion {
			x(): number;
			y(): number;
			z(): number;
			w(): number;
			constructor(x: number, y: number, z: number, w: number);
		}
	
		export class btTransform {
			setIdentity();
			setOrigin(v: btVector3);
			getOrigin(): btVector3;
			setRotation(q: btQuaternion);
			getRotation(): btQuaternion;
		}
	
		export class btRigidBodyConstructionInfo {
			constructor(mass: number, motionState: btDefaultMotionState, shape: btConvexShape, inertia: btVector3);
		}
	
		export class btDefaultMotionState {
			constructor(t: btTransform);
		}

		export class btMotionState extends btDefaultMotionState {
			getWorldTransform (centerOfMassWorldTrans: btTransform) 
			setWorldTransform (centerOfMassWorldTrans: btTransform)
		}
	}