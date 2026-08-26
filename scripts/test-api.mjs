async function runTests() {
  const tests = [
    { name: '1. 빈 입력 (0자)', payload: { mood: '' } },
    { name: '2. 최소 글자수 미만 (<5자)', payload: { mood: '힘듦' } },
    { name: '3. 정상 입력 (>=5자)', payload: { mood: '오늘 야근하고 운동까지 해서 너무 피곤해요' } },
  ];

  for (const t of tests) {
    console.log(`\n================= ${t.name} =================`);
    const res = await fetch('http://localhost:3000/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(t.payload),
    });

    const status = res.status;
    const json = await res.json();
    console.log(`HTTP Status: ${status}`);
    console.log(`Response:`, JSON.stringify(json, null, 2));
  }
}

runTests();
