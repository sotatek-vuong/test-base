import { MOCKUP_TOKENS } from '@/utils/constants/tokens';

export const sleep = (ms = 700) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getTokens = async (chainId?: number) => {
  await sleep();

  if (!chainId) return MOCKUP_TOKENS;

  return MOCKUP_TOKENS.filter((x) => x.chainId == chainId);
};
