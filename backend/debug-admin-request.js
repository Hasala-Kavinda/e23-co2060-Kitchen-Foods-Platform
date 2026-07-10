const base = 'http://localhost:8000';

async function run() {
  try {
    const login = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@test.com', password: '12345678' }),
    });
    const loginBody = await login.text();
    console.log('LOGIN status', login.status);
    console.log(loginBody);

    let token = null;
    if (login.ok) {
      const parsed = JSON.parse(loginBody);
      token = parsed.token;
    }

    if (!token) {
      console.error('Admin login failed, cannot continue create/delete test');
      return;
    }

    const targets = ['http://localhost:8000', 'http://localhost:5174', 'http://localhost:5173'];

    for (const targetBase of targets) {
      const uniqueUser = {
        full_name: 'Debug Test',
        email: `proxy+${Date.now()}+${targetBase.replace(/[^0-9]/g, '')}@example.com`,
        password: 'Password123!',
        role: 'Customer',
      };

      try {
        const response = await fetch(`${targetBase}/api/admin/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(uniqueUser),
        });
        const text = await response.text();
        console.log(`${targetBase} CREATE`, response.status, text);
      } catch (err) {
        console.error(`${targetBase} CREATE ERROR`, err.message);
      }
    }

    const usersResponse = await fetch(`http://localhost:8000/api/admin/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('GET USERS status', usersResponse.status);
    console.log(await usersResponse.text());

    const created = JSON.parse(createText);
    const deleteResponse = await fetch(`${base}/api/admin/users/${created.uid}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const deleteText = await deleteResponse.text();
    console.log('DELETE status', deleteResponse.status);
    console.log(deleteText);
  } catch (err) {
    console.error(err);
  }
}

run();
