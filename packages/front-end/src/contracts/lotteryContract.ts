import { ILotteryABI } from "../abi/ILottery";
import { useAccount, useReadContract } from 'wagmi'

// contract testnet address
export const LOTTERY_CONTRACT_ADDRESS =
  "0x01A9200d12e5BDEbB30245857983bfb8d2fa93eD" as const satisfies `0x${string}`;
export const POINTS_CONTRACT_ADDRESS =
  "0x7cC7646D0896e5d50c6A62ad3d29a51989E9d1f7" as const satisfies `0x${string}`;

export function useRoundEndTime() {
  const { data, isLoading, isError } = useReadContract({
    address: LOTTERY_CONTRACT_ADDRESS,
    abi: ILotteryABI,
    functionName: 'roundEndTime',
    args:[''],
  })

  return {
    endTime: data != null ? (data as bigint).toString() : undefined,
    isLoading,
    isError,
  }
}

/**
 * 读取某个地址购买的彩票总数
 * @param userAddress 可选，传入想查询的地址；默认用当前连接钱包地址
 */
export function useUserTicketCount(userAddress?: `0x${string}`) {
  // 如果没传地址，就拿当前连接的钱包地址
  const { address: connected } = useAccount()
  const target = (userAddress ?? connected) as `0x${string}`

  const { data, isLoading, isError } = useReadContract({
    address: LOTTERY_CONTRACT_ADDRESS,
    abi: ILotteryABI,
    functionName: 'ticketsBought',  // 把这里改成你合约里 getter 的名字
    args: [target],                 // mapping 的 key：用户地址
  })

  return {
    ticketCount: data != null
      ? (data as bigint).toString()
      : '0',
    isLoading,
    isError,
  }
}

/**
 * buy lottery tickets
 * @param roundId round id
 * @param amount amount
 * @param signature signature
 * @param deadline deadline
 */
export function useBuyLotteryTickets() {}
