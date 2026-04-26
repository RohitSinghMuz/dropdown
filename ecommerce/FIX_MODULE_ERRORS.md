# 🔧 Fix Missing Module Declarations

## Issues

1. Cannot find module '@react-native-community/netinfo'
2. Cannot find module '@react-native-async-storage/async-storage'
3. Cannot find module 'redux-saga/effects'

---

## Solution

### Step 1: Install Missing Dependencies

```bash
npm install @react-native-community/netinfo @react-native-async-storage/async-storage redux-saga
```

Or with Yarn:

```bash
yarn add @react-native-community/netinfo @react-native-async-storage/async-storage redux-saga
```

### Step 2: Install Type Declarations

```bash
npm install --save-dev @types/redux-saga
```

Or with Yarn:

```bash
yarn add --dev @types/redux-saga
```

### Step 3: Link Native Modules (iOS)

```bash
cd ios && pod install && cd ..
```

### Step 4: Rebuild Project

```bash
# For iOS
npm run ios

# For Android
npm run android
```

---

## Updated package.json

Your `package.json` should include:

```json
{
  "dependencies": {
    "@reduxjs/toolkit": "^1.9.7",
    "react-redux": "^8.1.3",
    "redux-saga": "^1.2.3",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/native-stack": "^6.9.17",
    "react-native-screens": "^3.27.0",
    "react-native-safe-area-context": "^4.7.2",
    "@react-native-async-storage/async-storage": "^1.21.0",
    "@react-native-community/netinfo": "^11.0.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-native": "^0.72.8",
    "@types/redux-saga": "^1.1.5",
    "typescript": "^5.2.2"
  }
}
```

---

## Verify Installation

### Check if modules are installed

```bash
# Check node_modules
ls node_modules/@react-native-community/netinfo
ls node_modules/@react-native-async-storage/async-storage
ls node_modules/redux-saga
```

### Check TypeScript can find modules

```bash
npx tsc --noEmit
```

---

## If Issues Persist

### Clear Cache and Reinstall

```bash
# Remove node_modules and lock files
rm -rf node_modules
rm package-lock.json  # or yarn.lock

# Reinstall
npm install

# For iOS
cd ios && pod install && cd ..

# Rebuild
npm run ios  # or npm run android
```

### Clear TypeScript Cache

```bash
# VSCode
Cmd+Shift+P → TypeScript: Restart TS Server

# Or manually
rm -rf node_modules/.cache
```

### Update tsconfig.json

Ensure your `tsconfig.json` has:

```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "node"
  }
}
```

---

## Complete Installation Commands

### All at Once

```bash
# Install all dependencies
npm install @reduxjs/toolkit react-redux redux-saga @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage @react-native-community/netinfo

# Install dev dependencies
npm install --save-dev @types/redux-saga

# Link native modules (iOS)
cd ios && pod install && cd ..

# Rebuild
npm run ios  # or npm run android
```

---

## Troubleshooting

### Issue: Module still not found after installation

**Solution 1:** Clear cache
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

**Solution 2:** Check node_modules
```bash
ls -la node_modules/@react-native-community/
ls -la node_modules/@react-native-async-storage/
ls -la node_modules/redux-saga/
```

**Solution 3:** Reinstall specific packages
```bash
npm uninstall @react-native-community/netinfo
npm install @react-native-community/netinfo
```

### Issue: TypeScript still shows errors

**Solution 1:** Restart TypeScript server
```
VSCode: Cmd+Shift+P → TypeScript: Restart TS Server
```

**Solution 2:** Check tsconfig.json
```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "esModuleInterop": true
  }
}
```

**Solution 3:** Clear TypeScript cache
```bash
rm -rf node_modules/.cache
```

### Issue: Pod install fails (iOS)

**Solution:**
```bash
cd ios
rm -rf Pods
rm Podfile.lock
pod install
cd ..
```

---

## Verify Everything Works

### 1. Check Modules Installed
```bash
npm list @react-native-community/netinfo
npm list @react-native-async-storage/async-storage
npm list redux-saga
```

### 2. Type Check
```bash
npx tsc --noEmit
```

### 3. Run App
```bash
npm run ios  # or npm run android
```

---

## Expected Output

After successful installation:

```
✅ @react-native-community/netinfo@11.0.2
✅ @react-native-async-storage/async-storage@1.21.0
✅ redux-saga@1.2.3
✅ @types/redux-saga@1.1.5

✅ No TypeScript errors
✅ App runs successfully
```

---

## Summary

1. ✅ Install missing packages
2. ✅ Install type declarations
3. ✅ Link native modules (iOS)
4. ✅ Rebuild project
5. ✅ Verify with `tsc --noEmit`

**All module issues should be resolved! 🚀**
