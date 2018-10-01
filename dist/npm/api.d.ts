/// <reference types="node" />
import { EventEmitter } from 'events';
import { Connection, errors, validate, xrpToDrops, dropsToXrp, iso8601ToRippleTime } from './common';
import { connect, disconnect, isConnected, getLedgerVersion } from './server/server';
import getTransaction from './ledger/transaction';
import getTransactions from './ledger/transactions';
import getTrustlines from './ledger/trustlines';
import getBalances from './ledger/balances';
import getBalanceSheet from './ledger/balance-sheet';
import getPaths from './ledger/pathfind';
import getOrders from './ledger/orders';
import getOrderbook from './ledger/orderbook';
import getSettings from './ledger/settings';
import getAccountInfo from './ledger/accountinfo';
import getAccountObjects from './ledger/accountobjects';
import getPaymentChannel from './ledger/payment-channel';
import preparePayment from './transaction/payment';
import prepareTrustline from './transaction/trustline';
import prepareOrder from './transaction/order';
import prepareOrderCancellation from './transaction/ordercancellation';
import prepareEscrowCreation from './transaction/escrow-creation';
import prepareEscrowExecution from './transaction/escrow-execution';
import prepareEscrowCancellation from './transaction/escrow-cancellation';
import preparePaymentChannelCreate from './transaction/payment-channel-create';
import preparePaymentChannelFund from './transaction/payment-channel-fund';
import preparePaymentChannelClaim from './transaction/payment-channel-claim';
import prepareCheckCreate from './transaction/check-create';
import prepareCheckCancel from './transaction/check-cancel';
import prepareCheckCash from './transaction/check-cash';
import prepareSettings from './transaction/settings';
import sign from './transaction/sign';
import combine from './transaction/combine';
import submit from './transaction/submit';
import { generateAddressAPI } from './offline/generate-address';
import computeLedgerHash from './offline/ledgerhash';
import signPaymentChannelClaim from './offline/sign-payment-channel-claim';
import verifyPaymentChannelClaim from './offline/verify-payment-channel-claim';
import getLedger from './ledger/ledger';
import { AccountObjectsRequest, AccountObjectsResponse, AccountOffersRequest, AccountOffersResponse, AccountInfoRequest, AccountInfoResponse, AccountLinesRequest, AccountLinesResponse, BookOffersRequest, BookOffersResponse, GatewayBalancesRequest, GatewayBalancesResponse, LedgerRequest, LedgerResponse, LedgerEntryRequest, LedgerEntryResponse, ServerInfoRequest, ServerInfoResponse } from './common/types/commands';
import RangeSet from './common/rangeset';
import * as ledgerUtils from './ledger/utils';
import * as schemaValidator from './common/schema-validator';
import { Instructions, Prepare } from './transaction/types';
export declare type APIOptions = {
    server?: string;
    feeCushion?: number;
    maxFeeXRP?: string;
    trace?: boolean;
    proxy?: string;
    timeout?: number;
};
declare class RippleAPI extends EventEmitter {
    _feeCushion: number;
    _maxFeeXRP: string;
    connection: Connection;
    static _PRIVATE: {
        validate: typeof validate;
        RangeSet: typeof RangeSet;
        ledgerUtils: typeof ledgerUtils;
        schemaValidator: typeof schemaValidator;
    };
    constructor(options?: APIOptions);
    /**
     * Makes a request to the API with the given command and
     * additional request body parameters.
     */
    request(command: 'account_info', params: AccountInfoRequest): Promise<AccountInfoResponse>;
    request(command: 'account_lines', params: AccountLinesRequest): Promise<AccountLinesResponse>;
    request(command: 'account_objects', params: AccountObjectsRequest): Promise<AccountObjectsResponse>;
    request(command: 'account_offers', params: AccountOffersRequest): Promise<AccountOffersResponse>;
    request(command: 'book_offers', params: BookOffersRequest): Promise<BookOffersResponse>;
    request(command: 'gateway_balances', params: GatewayBalancesRequest): Promise<GatewayBalancesResponse>;
    request(command: 'ledger', params: LedgerRequest): Promise<LedgerResponse>;
    request(command: 'ledger_entry', params: LedgerEntryRequest): Promise<LedgerEntryResponse>;
    request(command: 'server_info', params?: ServerInfoRequest): Promise<ServerInfoResponse>;
    request(command: string, params: any): Promise<any>;
    /**
     * Returns true if there are more pages of data.
     *
     * When there are more results than contained in the response, the response
     * includes a `marker` field.
     *
     * See https://ripple.com/build/rippled-apis/#markers-and-pagination
     */
    hasNextPage<T extends {
        marker?: string;
    }>(currentResponse: T): boolean;
    requestNextPage<T extends {
        marker?: string;
    }>(command: string, params: object, currentResponse: T): Promise<object>;
    /**
     * Prepare a transaction.
     *
     * You can later submit the transaction with `submit()`.
     */
    prepareTransaction(txJSON: object, instructions?: Instructions): Promise<Prepare>;
    /**
     * Convert a string to hex.
     *
     * This can be used to generate `MemoData`, `MemoType`, and `MemoFormat`.
     *
     * @param string string to convert to hex
     */
    convertStringToHex(string: string): string;
    /**
     * Makes multiple paged requests to the API to return a given number of
     * resources. _requestAll() will make multiple requests until the `limit`
     * number of resources is reached (if no `limit` is provided, a single request
     * will be made).
     *
     * If the command is unknown, an additional `collect` property is required to
     * know which response key contains the array of resources.
     *
     * NOTE: This command is used by existing methods and is not recommended for
     * general use. Instead, use rippled's built-in pagination and make multiple
     * requests as needed.
     */
    _requestAll(command: 'account_offers', params: AccountOffersRequest): Promise<AccountOffersResponse[]>;
    _requestAll(command: 'book_offers', params: BookOffersRequest): Promise<BookOffersResponse[]>;
    _requestAll(command: 'account_lines', params: AccountLinesRequest): Promise<AccountLinesResponse[]>;
    connect: typeof connect;
    disconnect: typeof disconnect;
    isConnected: typeof isConnected;
    getServerInfo: typeof ledgerUtils.common.serverInfo.getServerInfo;
    getFee: typeof ledgerUtils.common.serverInfo.getFee;
    getLedgerVersion: typeof getLedgerVersion;
    getTransaction: typeof getTransaction;
    getTransactions: typeof getTransactions;
    getTrustlines: typeof getTrustlines;
    getBalances: typeof getBalances;
    getBalanceSheet: typeof getBalanceSheet;
    getPaths: typeof getPaths;
    getOrders: typeof getOrders;
    getOrderbook: typeof getOrderbook;
    getSettings: typeof getSettings;
    getAccountInfo: typeof getAccountInfo;
    getAccountObjects: typeof getAccountObjects;
    getPaymentChannel: typeof getPaymentChannel;
    getLedger: typeof getLedger;
    preparePayment: typeof preparePayment;
    prepareTrustline: typeof prepareTrustline;
    prepareOrder: typeof prepareOrder;
    prepareOrderCancellation: typeof prepareOrderCancellation;
    prepareEscrowCreation: typeof prepareEscrowCreation;
    prepareEscrowExecution: typeof prepareEscrowExecution;
    prepareEscrowCancellation: typeof prepareEscrowCancellation;
    preparePaymentChannelCreate: typeof preparePaymentChannelCreate;
    preparePaymentChannelFund: typeof preparePaymentChannelFund;
    preparePaymentChannelClaim: typeof preparePaymentChannelClaim;
    prepareCheckCreate: typeof prepareCheckCreate;
    prepareCheckCash: typeof prepareCheckCash;
    prepareCheckCancel: typeof prepareCheckCancel;
    prepareSettings: typeof prepareSettings;
    sign: typeof sign;
    combine: typeof combine;
    submit: typeof submit;
    generateAddress: typeof generateAddressAPI;
    deriveKeypair: any;
    deriveAddress: any;
    computeLedgerHash: typeof computeLedgerHash;
    signPaymentChannelClaim: typeof signPaymentChannelClaim;
    verifyPaymentChannelClaim: typeof verifyPaymentChannelClaim;
    errors: typeof errors;
    xrpToDrops: typeof xrpToDrops;
    dropsToXrp: typeof dropsToXrp;
    iso8601ToRippleTime: typeof iso8601ToRippleTime;
    txFlags: {
        Universal: {
            FullyCanonicalSig: number;
        };
        AccountSet: {
            RequireDestTag: number;
            OptionalDestTag: number;
            RequireAuth: number;
            OptionalAuth: number;
            DisallowXRP: number;
            AllowXRP: number;
        };
        TrustSet: {
            SetAuth: number;
            NoRipple: number;
            SetNoRipple: number;
            ClearNoRipple: number;
            SetFreeze: number;
            ClearFreeze: number;
        };
        OfferCreate: {
            Passive: number;
            ImmediateOrCancel: number;
            FillOrKill: number;
            Sell: number;
        };
        Payment: {
            NoRippleDirect: number;
            PartialPayment: number;
            LimitQuality: number;
        };
        PaymentChannelClaim: {
            Renew: number;
            Close: number;
        };
    };
    isValidAddress: any;
    isValidSecret: typeof schemaValidator.isValidSecret;
}
export { RippleAPI };
