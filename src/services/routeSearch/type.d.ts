export interface RouteSearchParams {
  target: string;
  max_rxn_steps?: number;
  n_path?: number;
  max_material_cost?: number;
  exclude_substructures?: string[];
  exclude_materials?: string[];
  exclude_rxns?: string[];
}

export interface RouteSearchResponse {
  /**
   * 路线信息
   */
  data: Datum[] | null;
  /**
   * 搜索状态
   */
  status: SearchStatus;
  /**
   * 目标分子
   */
  target: string;
}

export interface Datum {
  children: RetroPath[];
  rxn: string;
  step: number;
  target: string;
}

/**
 * RetroPath
 */
export interface RetroPath {
  children: RetroPath[];
  rxn: string;
  step: number;
  target: string;
}

/**
 * 搜索状态
 *
 * SearchStatus
 */
export interface SearchStatus {
  /**
   * 当前搜索到的深度
   */
  current_step: number;
  /**
   * 具体展示，比如出错信息
   */
  detail_message: null | string;
  /**
   * 目标搜索深度
   */
  max_step: number;
  /**
   * 以发现的路径数量
   */
  n_solve_path: number;
  /**
   * 搜索是否完成
   */
  status: Status;
}

/**
 * 搜索是否完成
 */
export type Status = "completed" | "running" | "failed";
