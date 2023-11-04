import { Module } from '@nestjs/common'
import { BorderModule } from './border/border.module'
import { PizzaSizeModule } from './pizzaSize/pizzaSize.module'
import { FlavorModule } from './flavor/flavor.module'
import { BudModule } from './bud/bud.module'
import { DrinkModule } from './drink/drink.module'
import { ComboModule } from './combo/combo.module'
import { ClientModule } from './client/client.module'

@Module({
  imports: [BorderModule, PizzaSizeModule, FlavorModule, BudModule, DrinkModule, ComboModule, ClientModule],
})
export class AppModule {}
