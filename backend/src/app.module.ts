import { Module } from '@nestjs/common'
import { ClientModule } from './client/client.module'
import { AddressModule } from './address/address.module'
import { PizzaSizeModule } from './pizzaSize/pizzaSize.module'
import { FlavorModule } from './flavor/flavor.module'
import { BorderModule } from './border/border.module'
import { BudModule } from './bud/bud.module'
import { DrinkModule } from './drink/drink.module'
import { ComboModule } from './combo/combo.module'
import { OrdersModule } from './orders/orders.module'

@Module({
  imports: [
    ClientModule,
    AddressModule,
    PizzaSizeModule,
    FlavorModule,
    BorderModule,
    BudModule,
    DrinkModule,
    ComboModule,
    OrdersModule,
  ],
})
export class AppModule {}
