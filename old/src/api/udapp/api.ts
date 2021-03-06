import { BaseApi } from '../base'
import { extendsProfile } from "../profile"
import { ModuleProfile, Api, API } from '../../types'
import { RemixTx, RemixTxReceipt, VMAccount } from './type'

export interface IUdappApi extends Api {
  events: {
    newTransaction: (transaction: RemixTx) => void
  }
  methods: {
    sendTransaction(tx: RemixTx): RemixTxReceipt
    getAccounts(): string[]
    createVMAccount(vmAccount: VMAccount): string
  }
}

export const udappProfile: ModuleProfile<IUdappApi> = {
  name: 'udapp', // Will be removed when extended
  kind: 'udapp',
  events: ['newTransaction'],
  methods: ['sendTransaction', 'getAccounts', 'createVMAccount'],
}

export abstract class UdappApi<T extends Api>
  extends BaseApi<T & IUdappApi>
  implements API<IUdappApi> {
  constructor(profile: ModuleProfile) {
    const localProfile = extendsProfile(profile, udappProfile)
    super(localProfile)
  }

  abstract sendTransaction(tx: RemixTx): RemixTxReceipt
  abstract getAccounts(): string[]
  abstract createVMAccount(vmAccount: VMAccount): string
}
