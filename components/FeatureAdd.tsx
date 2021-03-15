import { Button, Grid, Input, NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper } from "@chakra-ui/react";
import { useStore } from "effector-react";

import $featureStore, { addProductFeature, setInitialFeatureEffort, setInitialFeatureImpact, setInitialFeatureTitle } from '../store/feature-store';

function FeatureAdd() {
  const featureList = useStore($featureStore);
  return (
    <Grid pt={2} templateColumns="8fr 1fr 1fr 2fr" columnGap="3">
      <Input placeholder='Feature title'
        value={featureList.initalFeature.title}
        onChange={(evt) => setInitialFeatureTitle(evt.target.value)} />
      <NumberInput 
        max={5}
        min={1}
        value={featureList.initalFeature.impact}
        onChange={(value) => setInitialFeatureImpact( parseInt(value) ) }
        >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <NumberInput
        max={5}
        min={1}
        value={featureList.initalFeature.effort}
        onChange={(value) => setInitialFeatureEffort(parseInt(value)) }>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Button onClick={() => addProductFeature()}>Add Feature</Button>
    </Grid>
  );

}

export default FeatureAdd;