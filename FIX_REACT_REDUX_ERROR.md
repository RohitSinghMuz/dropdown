# 🔧 Fix "Cannot find module 'react-redux'" Error

## Problem

You're getting this error because the ecommerce dependencies are not installed in your project.

```
Cannot find module 'react-redux' or its corresponding type declarations.
Cannot find module '@react-navigation/native' or its corresponding type declarations.
```

## Solution

### Step 1: Delete node_modules and package-lock.json

```bash
cd /Users/rohitsingh/Desktop/reactNative/dropdown
rm -rf node_modules
rm package-lock.json
```

### Step 2: Install All Dependencies

```bash
npm install
```

This will install all packages listed in the updated `package.json` file.

**Wait for installation to complete** (this may take 5-10 minutes)

### Step 3: Link Native Modules (iOS)

```bash
cd ios && pod install && cd ..
```

### Step 4: Verify Installation

```bash
npx tsc --noEmit --skipLibCheck
```

**Expected Output:**
```
✅ No errors found
```

### Step 5: Run Your App

```bash
npm run ios  # or npm run android
```

---

## Complete Command (Copy & Paste)

If you want to do everything at once:

```bash
cd /Users/rohitsingh/Desktop/reactNative/dropdown && rm -rf node_modules package-lock.json && npm install && cd ios && pod install && cd .. && npx tsc --noEmit --skipLibCheck
```

---

## What Gets Installed

### Ecommerce Dependencies (7 new packages)
```
✅ @reduxjs/toolkit@1.9.7
✅ react-redux@8.1.3
✅ redux-saga@1.2.3
✅ @react-navigation/native@6.1.9
✅ @react-navigation/native-stack@6.9.17
✅ react-native-screens@3.27.0
✅ @react-native-async-storage/async-storage@1.21.0
✅ @react-native-community/netinfo@11.0.2
```

### Type Declarations (1 new package)
```
✅ @types/redux-saga@1.1.5
```

---

## Verify Installation

### Check if modules are installed

```bash
npm list react-redux
npm list @react-navigation/native
npm list redux-saga
npm list @reduxjs/toolkit
```

### Check TypeScript errors

```bash
npx tsc --noEmit --skipLibCheck
```

---

## Troubleshooting

### Issue: Installation fails

**Solution 1:** Clear npm cache
```bash
npm cache clean --force
npm install
```

**Solution 2:** Use yarn instead
```bash
yarn install
cd ios && pod install && cd ..
```

### Issue: Pod install fails

```bash
cd ios
rm -rf Pods
rm Podfile.lock
pod install
cd ..
```

### Issue: Still getting "Cannot find module" error

**Solution 1:** Restart TypeScript server in VSCode
```
Cmd+Shift+P → TypeScript: Restart TS Server
```

**Solution 2:** Close and reopen VSCode

**Solution 3:** Clear TypeScript cache
```bash
rm -rf node_modules/.cache
```

### Issue: "npm: command not found"

Install Node.js from https://nodejs.org/

---

## After Installation

✅ All modules will be found
✅ All TypeScript errors resolved
✅ App will run successfully
✅ All ecommerce features will work

---

## Time Required

- Delete node_modules: 30 seconds
- npm install: 5-10 minutes
- pod install: 2-3 minutes
- Verify: 1 minute
- **Total: 8-15 minutes**

---

## Next Steps

1. **Run Step 1:** Delete node_modules and package-lock.json
2. **Run Step 2:** npm install
3. **Run Step 3:** pod install (iOS)
4. **Run Step 4:** Verify with TypeScript check
5. **Run Step 5:** npm run ios or npm run android

---

## Quick Reference

### Delete and Reinstall
```bash
cd /Users/rohitsingh/Desktop/reactNative/dropdown && rm -rf node_modules package-lock.json && npm install
```

### Link Native Modules
```bash
cd ios && pod install && cd ..
```

### Verify
```bash
npx tsc --noEmit --skipLibCheck
```

### Run App
```bash
npm run ios  # or npm run android
```

---

**After completing these steps, all errors will be resolved! 🎉**
