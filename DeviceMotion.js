// Check if the DeviceMotionEvent requestPermission method is available
if (DeviceMotionEvent.requestPermission) {
    DeviceMotionEvent.requestPermission().then(permissionState => {
        if (permissionState === 'granted') {
            // Permission granted, listen for device motion events
            document.addEventListener("devicemotion", function(event) {
                const accX = event.accelerationIncludingGravity.x || 0;
                const accY = event.accelerationIncludingGravity.y || 0;
                const accZ = event.accelerationIncludingGravity.z || 0;

                const shakeThreshold = 15; // Adjust based on sensitivity needs
                const totalAcceleration = Math.sqrt(accX * accX + accY * accY + accZ * accZ);

                if (totalAcceleration > shakeThreshold) {
                    // Send message to Unity
                    if (typeof unityInstance !== 'undefined') {
                        unityInstance.SendMessage("YourUnityObject", "OnShakeDetected");
                    }
                }
            });
        } else {
            console.log("Motion data permission denied");
        }
    }).catch(error => {
        console.error("Error requesting permission for motion data: ", error);
    });
} else {
    // If permission is not required (older browsers or supported directly)
    document.addEventListener("devicemotion", function(event) {
        const accX = event.accelerationIncludingGravity.x || 0;
        const accY = event.accelerationIncludingGravity.y || 0;
        const accZ = event.accelerationIncludingGravity.z || 0;

        const shakeThreshold = 15; // Adjust based on sensitivity needs
        const totalAcceleration = Math.sqrt(accX * accX + accY * accY + accZ * accZ);

        if (totalAcceleration > shakeThreshold) {
            // Send message to Unity
            if (typeof unityInstance !== 'undefined') {
                unityInstance.SendMessage("YourUnityObject", "OnShakeDetected");
            }
        }
    });
}
