import { generateDrinkRecommendation } from '../lib/ai';

const TEST_SCENARIOS = [
  {
    title: '💻 시나리오 1: 코딩 과제 & 야근 방전',
    mood: '오늘 하루종일 복잡한 리액트 버그 잡느라 야근하고 방금 퇴근했어 머리가 터질 것 같아',
  },
  {
    title: '🏃 시나리오 2: 헬스 & 러닝 피로',
    mood: '헬스장에서 하체 운동 빡세게 하고 러닝 5km 뛰고 왔더니 온몸에 땀나고 기운이 하나도 없어',
  },
  {
    title: '🎉 시나리오 3: 프로젝트 성공 & 축하',
    mood: '오늘 몇 달 동안 준비한 프로젝트 최종 발표 성공적으로 끝내고 최고 평점 받았어 기분 최고야!',
  },
  {
    title: '🌧️ 시나리오 4: 비오는 밤 차분한 힐링',
    mood: '창밖에 조용히 비가 내리고 센치한 밤이야 혼자 음악 들으면서 조용히 하루를 마무리하고 싶어',
  },
];

async function runGeminiBenchmark() {
  console.log('='.repeat(70));
  console.log('🍷 Mood Drink - Gemini AI 추천 엔진 실시간 터미널 검증 CLI');
  console.log('='.repeat(70));

  const provider = process.env.AI_PROVIDER || 'auto';
  const apiKeyPresent = Boolean(
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.AI_API_KEY
  );

  console.log(`📌 Provider 설정: ${provider}`);
  console.log(`🔑 Gemini API 키 연동 상태: ${apiKeyPresent ? '연동됨 (Active)' : '미설정 (Smart Mock 엔진 모드)'}`);
  console.log(`⏱️ 타임아웃 제한: ${process.env.AI_TIMEOUT_MS || 3000}ms\n`);

  for (let i = 0; i < TEST_SCENARIOS.length; i++) {
    const { title, mood } = TEST_SCENARIOS[i];
    console.log(`\n----------------------------------------------------------------------`);
    console.log(`[${i + 1}/${TEST_SCENARIOS.length}] ${title}`);
    console.log(`💬 사용자 입력: "${mood}"`);
    console.log(`----------------------------------------------------------------------`);

    const startTime = Date.now();
    try {
      const result = await generateDrinkRecommendation(mood);
      const duration = Date.now() - startTime;

      console.log(`\n✨ [AI 페어링 결과] (${duration}ms 소요)`);
      console.log(`   💌 위로/공감 멘트 : "${result.comfort}"`);
      console.log(`   🍺 추천 주종     : ${result.drink}`);
      console.log(`   🍴 페어링 안주   : ${result.snack}`);
      console.log(`   🏷️ Fallback 여부 : ${result.isFallback ? '⚡ Fallback' : '🤖 실시간 AI 생성'}`);
    } catch (err) {
      console.error(`❌ 에러 발생:`, err);
    }
  }

  console.log(`\n======================================================================`);
  console.log(`✅ 모든 AI 추천 시나리오 검증이 완료되었습니다!`);
  console.log(`======================================================================\n`);
}

runGeminiBenchmark().catch(console.error);
