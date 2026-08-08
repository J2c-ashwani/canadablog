/**
 * Core Engine Freeze Policy Architectural Guard
 * Ensures the CEO Agent code never imports or mutates frozen recommendation/scoring engines.
 */

export class CoreEngineFreezeGuard {
  private static FROZEN_MODULE_PATHS = [
    'lib/engine',
    'lib/editorial/priorityResearchContent.ts',
    'lib/ai-grant-matcher.ts'
  ]

  public static assertFreezeCompliance(targetModulePath: string): void {
    for (const frozenPath of this.FROZEN_MODULE_PATHS) {
      if (targetModulePath.includes(frozenPath)) {
        throw new Error(
          `[CoreEngineFreezeGuard] SECURITY VIOLATION: CEO OS attempted to access frozen engine module '${targetModulePath}'. The core Funding Intelligence Platform is frozen per company policy.`
        )
      }
    }
  }

  public static isReadOnlyAccessAllowed(actionName: string): boolean {
    // Read-only queries to completed customer recommendation results are permitted
    return actionName.startsWith('get_') || actionName.startsWith('query_') || actionName.startsWith('fetch_')
  }
}
