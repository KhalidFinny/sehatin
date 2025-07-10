// Test file untuk memverifikasi login admin
// Jalankan dengan: npx ts-node src/test-admin-login.ts

import { AuthService } from './services/auth.service';

// Mock Router untuk testing
class MockRouter {
  navigate(path: string[]) {
    console.log('MockRouter: Navigating to', path);
  }
}

// Test login admin
function testAdminLogin() {
  console.log('=== Testing Admin Login ===');

  const mockRouter = new MockRouter();
  const authService = new AuthService(mockRouter as any, 'browser');

  // Test 1: Login admin yang benar
  console.log('\nTest 1: Login admin dengan kredensial yang benar');
  const result1 = authService.login('admin@sehatin.com', 'admin123');
  console.log('Login result:', result1);
  console.log('Current user:', authService.getCurrentUser());

  // Test 2: Login admin dengan password salah
  console.log('\nTest 2: Login admin dengan password salah');
  const result2 = authService.login('admin@sehatin.com', 'wrongpassword');
  console.log('Login result:', result2);

  // Test 3: Login dengan email yang tidak ada
  console.log('\nTest 3: Login dengan email yang tidak ada');
  const result3 = authService.login('nonexistent@sehatin.com', 'admin123');
  console.log('Login result:', result3);

  console.log('\n=== Test Complete ===');
}

// Jalankan test jika file dijalankan langsung
if (require.main === module) {
  testAdminLogin();
}

export { testAdminLogin };
