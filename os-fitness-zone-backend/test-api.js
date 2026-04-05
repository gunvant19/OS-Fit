const testAuth = async () => {
  try {
    console.log('--- Registering Admin ---');
    let res = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Admin User', email: 'admin@example.com', password: 'adminpassword123' })
    });
    
    // Ignore 409 if exists
    if(res.status !== 409 && !res.ok) {
       console.log('Register failed', await res.text());
    } else {
       console.log('Register OK (or already exists).');
    }

    console.log('\n--- Logging in Admin ---');
    res = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'adminpassword123' })
    });
    
    if(!res.ok) throw new Error('Login failed');
    const { accessToken } = await res.json();
    console.log('Login OK. Access Token received.');

    console.log('\n--- Testing Admin Role Route POST /api/trainers ---');
    res = await fetch('http://localhost:3001/api/trainers', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        name: 'Test Trainer', email: 'trainer@example.com', specialization: 'Yoga', experience: 5
      })
    });
    
    if(res.ok || res.status === 409) {
       console.log('Admin authorization OK for Trainer creation.');
    } else {
       console.log('Admin authorization failed:', await res.text());
    }
    
    console.log('\n--- Registering Normal User ---');
    res = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Normal User', email: 'user@example.com', password: 'userpassword123' })
    });

    console.log('\n--- Logging in User ---');
    res = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@example.com', password: 'userpassword123' })
    });
    const { accessToken: userToken } = await res.json();

    console.log('\n--- Testing User Role Route POST /api/trainers (Should fail) ---');
    res = await fetch('http://localhost:3001/api/trainers', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({
        name: 'Hacker', email: 'hacker@example.com', specialization: 'Hack', experience: 1
      })
    });

    if(res.status === 403) {
      console.log('User appropriately blocked with 403 Forbidden! Role authorization works.');
    } else {
      console.log('Security Flaw: User was able to access admin route.', await res.text());
    }

  } catch(e) {
    console.error('Test Error:', e);
  }
};

testAuth();
