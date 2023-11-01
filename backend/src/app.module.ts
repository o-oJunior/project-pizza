import { Module } from '@nestjs/common'
import { BorderModule } from './borders/border.module'
import { PizzaSizeModule } from './pizzaSizes/pizzaSize.module'
import { FlavorModule } from './flavors/flavor.module'
import { BudModule } from './buds/bud.module'
import { DrinkModule } from './drinks/drink.module'
import { ComboModule } from './combos/combo.module'

@Module({
  imports: [BorderModule, PizzaSizeModule, FlavorModule, BudModule, DrinkModule, ComboModule],
})
export class AppModule {}
