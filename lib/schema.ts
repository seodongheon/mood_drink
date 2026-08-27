import { z } from 'zod';

/**
 * 클라이언트 입력값 검증 스키마
 * - 최소 5자 이상 (PRD: 빈칸 및 5자 미만 방어)
 * - 최대 300자 이하 (PRD: 300자 초과 방어)
 */
export const requestSchema = z.object({
  mood: z
    .string({
      message: '오늘 하루를 짧게라도 들려주세요!',
    })
    .trim()
    .min(1, '오늘 하루를 짧게라도 들려주세요!')
    .min(5, '조금 더 자세히 들려주세요!')
    .max(300, '300자 이내로 입력해 주세요.'),
});

/**
 * AI 추천 결과 스키마 (PRD 명세 준수)
 */
export const recommendationResultSchema = z.object({
  comfort: z.string().min(1, '위로 멘트는 필수입니다.'),
  drink: z.string().min(1, '주종은 필수입니다.'),
  snack: z.string().min(1, '안주는 필수입니다.'),
  isFallback: z.boolean().optional(),
});

export type RequestSchemaType = z.infer<typeof requestSchema>;
export type RecommendationResultSchemaType = z.infer<typeof recommendationResultSchema>;
