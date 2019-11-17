package com.velidjanov.mew.mewscaffolds.pojo;

import com.velidjanov.mew.mewscaffolds.entity.Print;
import com.velidjanov.mew.mewscaffolds.entity.Settings;
import lombok.*;

import javax.validation.constraints.NotNull;

@NoArgsConstructor @Getter @Setter @ToString
public class TemplateModel {

    @NotNull
    private Print print;
    @NotNull
    private Settings settings;

    private Long numberOfScaffolds;
    private Long highestNumberOfLayers;
}
