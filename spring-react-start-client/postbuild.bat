set buildPath="..\spring-react-start-backend\src\main\resources\static"

ECHO "Attempting to delete old bundle"
rmdir /s /q %buildPath%
ECHO "Deleted old bundle"
ECHO "Attempting to move bundle to backend static resources"
move build %buildPath%
ECHO "Move successful! Build is ready for deployment"