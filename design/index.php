<?php
    header("Content-Type: text/html; charset=utf-8");
    global $page;

    $page = str_replace(array('/design/', '?'.$_SERVER['QUERY_STRING'], '.html'), '', $_SERVER['REQUEST_URI']);
    if ($page == 'index.php' || $page=='') $page = 'home';

    global $root;
    global $root_url;// = $_SERVER['HTTP_URL'];
    $root = dirname(__FILE__);
    $root_url = 'http://'.$_SERVER['HTTP_HOST'].dirname($_SERVER["SCRIPT_NAME"]).'/';

    global $class;
    global $param;
    global $url;

    $class = '';
    $param = '';
    $url = '';

    $sAct = isset($_REQUEST['act']) ? $_REQUEST['act'] : '';

    global $sLessElementsPlaceholder1;
    global $sLessElementsPlaceholder2;
    global $sLessModsPlaceholder1;
    global $sLessModsPlaceholder2;

    $sLessElementsPlaceholder1 = "// auto-generated ELEMENTS start";
    $sLessElementsPlaceholder2 = "// auto-generated ELEMENTS stop";;

    $sLessModsPlaceholder1 = "// auto-generated MODIFIERS start";
    $sLessModsPlaceholder2 = "// auto-generated MODIFIERS stop";

    $sHtml = tpl("index.html");
    print $sHtml;

    if ($sAct == 'css') {
        $aBlocks = create_css($sHtml);
        print format_css($aBlocks);
    }
    elseif ($sAct == 'css-test') {
        $aBlocks = create_css($sHtml, "test");
        print format_css($aBlocks);
    }

    function block($sBlockClass, $sParam='', $bPrint=true)
    {
        global $root_url;

        global $class;
        global $param;
        global $url;

        $class_ini = $class;
        $param_ini = $param;
        $url_ini = $url;

        list($sBlock, ) = explode(' ', $sBlockClass);

        $class = $sBlockClass;
        $param = $sParam;
        $url = $root_url."/blocks/{$sBlock}/";

        $sFilePath = "blocks/{$sBlock}/{$sBlock}.html";
        if (!file_exists($sFilePath)) {
            // directory or file not exists
            create_block($sBlock, $param);
        }

        $sHtml = tpl($sFilePath);

        $class = $class_ini;
        $param = $param_ini;
        $url = $url_ini;

        if ($bPrint) {
            print $sHtml;
            return '';
        }
        else {
            return $sHtml;
        }

    }

    function create_block($sBlock, $sParam='')
    {
        global $root;

        global $sLessElementsPlaceholder2;
        global $sLessModsPlaceholder2;

        $sBlockDir = $root.'/blocks/'.$sBlock.'/';

        if (!file_exists($sBlockDir)) {
            mkdir($sBlockDir);
        }

        if (!$sParam) {
            $sHtml =
'<div class="{$class}">
    <p class="__title">Block '.$sBlock.'</p>
</div><!-- '.$sBlock.' -->';
        }
        else {
            $sHtml =
'<div class="{$class}">
    <p class="__title">Block '.$sBlock.'</p>
    <?php if ($params == "") {?>
    
    <?php } elseif ($params ==  "'.$sParam.'") {?>
    
    <?php } else { ?>
    
    <?php } ?>
</div><!-- '.$sBlock.' -->';
        }

        $sLess =
".{$sBlock} {
    @block: ~\".{$sBlock}\";
    // not allowed outer geometry for block (margin, width, height, position: absolute, fixed)
    
    &__title {
            
    }
    
    /* 
        Modifiers 
    */
    
    &_modifier {
        
        @{block}__title {
            
        }
    }
    
    /*
        Media
    */
    
    @media @xs, @sm, @md, @lg, @xxl {
        
        & {
            
        }
    }
    
{$sLessElementsPlaceholder2}

{$sLessModsPlaceholder2}
}";

        $sJsClass = "";
        $sJsVar = "";
        $aParts = explode('-', $sBlock);
        foreach ($aParts as $pnum => $sPart) {
            $sJsVar .= ($pnum==0) ? $sPart : ucfirst($sPart);
            $sJsClass .= ucfirst($sPart);
        }

        $sJs = <<<JS
$(document).ready(function() {
    $sJsVar.init();
});

function $sJsClass ()
{
    Block.apply(this, arguments);
}

$sJsClass.prototype = Object.create(Block.prototype);
$sJsClass.prototype.constructor = $sJsClass;

$sJsClass.prototype.init = function() {
    var _ = this;
    return this;
};

var $sJsVar = new $sJsClass('.$sBlock', '$sBlock');
JS;

   if (!file_exists($sBlockDir.$sBlock.'.html')) {
            file_put_contents($sBlockDir . $sBlock . '.html', $sHtml);
        }

        if (!file_exists($sBlockDir.$sBlock.'.less')) {
            file_put_contents($sBlockDir . $sBlock . '.less', $sLess);

            $sStylesPath = $root . '/less/styles.less';
            $sStyles = file_get_contents($sStylesPath);

            $sInsLine = "@import \"../blocks/{$sBlock}/{$sBlock}.less\";";
            $sPlaceholder = '// import blocks ends';

            if (strpos($sStyles, $sInsLine) === false) {
                $aReplace = array(
                    $sPlaceholder => $sInsLine."\n".$sPlaceholder ,
                );

                $sStyles = str_replace(array_keys($aReplace), array_values($aReplace), $sStyles);
                file_put_contents($sStylesPath, $sStyles);
            }
        }

        if (!file_exists($sBlockDir.$sBlock.'.js') && !file_exists($sBlockDir.'_'.$sBlock.'.js')) {
            file_put_contents($sBlockDir.'_'.$sBlock.'.js', $sJs);
        }

        return;


    }

    function tpl($sPath)
    {
        global $root;

        global $class;
        global $param;
        global $url;
        global $page;


        ob_start();
        include $root.'/'.$sPath;
        $sHtml = ob_get_contents();
        ob_end_clean();

        list($sBlock, ) = explode(' ', $class);

        $aReplace = array(
            '{$class}' => $class,
            '{$param}' => $param,
            '{$url}'   => $url,
            '{block}'  => $sBlock,
            '"__'      => '"'.$sBlock.'__', // block element
            '\'__'      => '\''.$sBlock.'__', // block element
            ' __'      => ' '.$sBlock.'__', // block element
            '{be}'     => $sBlock.'__', // block element
            '{bm}'     => $sBlock.'_',  // block modificator
            '</block>' => '',
        );
        $sHtml = str_replace(array_keys($aReplace), array_values($aReplace), $sHtml);

        $sHtml = preg_replace_callback("!<block[^>]*>!", function($aMatches) {
            if (!preg_match('!class\s*=\s*"([^"]*?)"!', $aMatches[0], $aMatchClass)) {
                return "no class found";
            }
            $sClass = $aMatchClass[1];

            if (!preg_match('!param\s*=\s*"([^"]*?)"!', $aMatches[0], $aMatchParam)) {
                $sParam = '';
            }
            else {
                $sParam = $aMatchParam[1];
            }

            return block($sClass, $sParam, false);
        }, $sHtml);

        return $sHtml;
    }

    function create_css($sHtml, $sMode='')
    {
        global $sLessElementsPlaceholder1;
        global $sLessElementsPlaceholder2;
        global $sLessModsPlaceholder1;
        global $sLessModsPlaceholder2;

        $aBlocks = array();

        if (!preg_match_all("!class\s*=\s*['\"](.*?)['\"]!", $sHtml, $aMatches)) {
            return array();
        }

        foreach ($aMatches[1] as $sClasses) {
            $aClasses = preg_split("!\s+!", $sClasses);
            foreach ($aClasses as $sClass) {
                $sClassType = '';
                if (substr_count($sClass, '__')==1) {
                    // element
                    list($sBlock, ) = explode("__", $sClass);
                    $sClassType = 'element';
                }
                elseif (substr_count($sClass, '_')==1) {
                    // modifier
                    list($sBlock, ) = explode("_", $sClass);
                    $sClassType = 'modifier';
                }
                else {
                    continue;
                }

                if (!isset($aBlocks[$sBlock])) {
                    $aBlocks[$sBlock] = array(
                        'aElements' => array(),
                        'aModifiers' => array(),
                    );
                }

                $sLessSelector = '&'.substr($sClass, strlen($sBlock));

                if ($sClassType == 'element') {
                    if (in_array($sLessSelector, $aBlocks[$sBlock]['aElements'])) continue;
                    $aBlocks[$sBlock]['aElements'][] = $sLessSelector;
                }
                elseif ($sClassType == 'modifier') {
                    if (in_array($sLessSelector, $aBlocks[$sBlock]['aModifiers'])) continue;
                    $aBlocks[$sBlock]['aModifiers'][] = $sLessSelector;
                }

            }
        }

        global $root;
        foreach ($aBlocks as $sBlock => $aBlock) {

            $sLessPath = $root."/blocks/{$sBlock}/{$sBlock}.less";
            if (!file_exists($sLessPath)) {
                // less file not exists
                $aBlocks[$sBlock]["msg"] = "File {$sLessPath} does not exist";
                continue;
            }

            $sLess = file_get_contents($sLessPath);

            // less elements
            $sElements = '';
            foreach ($aBlock['aElements'] as $kkk => $sElement) {
                $sElement2 = str_replace("&", "@{block}", $sElement);
                if (stripos($sLess, $sElement.' ') !== false || stripos($sLess, $sElement.'{') !== false || stripos($sLess, $sElement.',') !== false ||
                    stripos($sLess, $sElement2.' ') !== false || stripos($sLess, $sElement2.'{') !== false || stripos($sLess, $sElement2.',') !== false)
                {
                    // element already set
                    unset($aBlocks[$sBlock]["aElements"][$kkk]);
                    continue;
                }

                $sElements .=
"
    {$sElement} {
        
    }
    ";

            }

            // less modifiers
            $sModifiers = '';
            foreach ($aBlock['aModifiers'] as $kkk => $sModifier) {
                $sModifier2 = str_replace("&", "@{block}", $sModifier);
                if (stripos($sLess, $sModifier.' ') !== false || stripos($sLess, $sModifier.'{') !== false || stripos($sLess, $sModifier.',') !== false ||
                    stripos($sLess, $sModifier2.' ') !== false || stripos($sLess, $sModifier2.'{') !== false || stripos($sLess, $sModifier2.',') !== false)
                {
                    // modifier already set
                    unset($aBlocks[$sBlock]["aModifiers"][$kkk]);
                    continue;
                }

                $sModifiers .=
"
    {$sModifier} {
        
    }
    ";

            }

            $aLessReplace = array();

            $sTime = date("d.m.Y H:i");

            if (!$sElements && !$sModifiers) {
                unset($aBlocks[$sBlock]);
                continue;
            }

            if ($sElements) {
                if (strpos($sLess, $sLessElementsPlaceholder2) === false) {
                    // no placeholder, insert it

                    if (strpos($sLess, $sLessModsPlaceholder1) === false) { // TODO: find end of block
                        $sLessLeft = substr(rtrim($sLess), 0, -1);
                        $sLessRight = "}";
                    }
                    else {
                        // elements before modifiers
                        $sLessLeft = substr($sLess, 0, strpos($sLess, $sLessModsPlaceholder1)-1);
                        $sLessRight = substr($sLess, strpos($sLess, $sLessModsPlaceholder1));
                    }

                    $sLess = $sLessLeft."\n".$sLessElementsPlaceholder2."\n".$sLessRight;
                }

                $sElements = "\n{$sElements}\n";
                $aLessReplace[$sLessElementsPlaceholder2] = $sLessElementsPlaceholder1." ({$sTime})".$sElements.$sLessElementsPlaceholder2."\n";
            }

            if ($sModifiers) {
                if (strpos($sLess, $sLessModsPlaceholder2) === false) {
                    // no placeholder, insert it

                    if (strpos($sLess, $sLessElementsPlaceholder2) === false) { // TODO: find end of block
                        $sLessLeft = substr(rtrim($sLess), 0, -1);
                        $sLessRight = "}";
                    }
                    else {
                        // modifiers after elements
                        $sLessLeft = substr($sLess, 0, strpos($sLess, $sLessElementsPlaceholder2)+strlen($sLessElementsPlaceholder2));
                        $sLessRight = substr($sLess, strpos($sLess, $sLessElementsPlaceholder2)+strlen($sLessElementsPlaceholder2));
                    }

                    $sLess = $sLessLeft."\n".$sLessModsPlaceholder2."\n".$sLessRight;
                }

                $sModifiers = "\n{$sModifiers}\n";
                $aLessReplace[$sLessModsPlaceholder2] = $sLessModsPlaceholder1." ({$sTime})".$sModifiers.$sLessModsPlaceholder2."\n";
            }

            $sLessNew = str_replace(array_keys($aLessReplace), array_values($aLessReplace), $sLess);
            if ($sMode != 'test') {
                file_put_contents($sLessPath, $sLessNew);
            }
        }

        return $aBlocks;
    }

    function format_css($aBlocks)
    {
        if (empty($aBlocks)) {
            return 'nothing changed';
        }

        $sRes = '';
        foreach ($aBlocks as $sBlock => $aBlock) {
            $sRes .= "\n\nBlock: <b>{$sBlock}</b>";
            if (isset($aBlock['msg'])) {
                $sRes .= " <span style='color:red;'>{$aBlock['msg']}</span>";
            }

            if (!empty($aBlock['aElements'])) {
                $sRes .= "\n\n\t<em>Elements</em>";
                foreach ($aBlock['aElements'] as $sElement) {
                    $sRes .= "\n\t\t+ {$sElement}";
                }
            }

            if (!empty($aBlock['aModifiers'])) {
                $sRes .= "\n\n\t<em>Modifiers</em>";
                foreach ($aBlock['aModifiers'] as $sModifier) {
                    $sRes .= "\n\t\t+ {$sModifier}";
                }
            }
        }

        return "<pre>{$sRes}</pre>";
    }

    function ppd($arr)
    {
      print "<pre>";
      print_r($arr);
      die();
    }

/*  function getCatsHtml($pid = 0, $iLevel = 1)
  {
      $oDb  = &Db::inst();

      $aCats = $oDb->query('id, alias, title'.App::conf('lng_pref').' AS title, is_nested', 'products.catalog', array('pid='=>$pid, 'active=1', 'ismenu=1'), 'sort ASC');

      if (empty($aCats)) {
          return '';
      }

      $iColsNum = 1;
      $iColsItems = 12;
      if (count($aCats) >= $iColsItems) {
          $bHasNested = false;
          foreach ($aCats as $kkk => $vvv) {
              if ($vvv['is_nested']) {
                  $bHasNested = true;
                  break;
              }
          }

          if (!$bHasNested) {
//$iColsNum = ceil(count($aCats)/$iColsItems);
              $iColsNum = 2;
              $iColsItems = ceil(count($aCats)/$iColsNum);
          }
      }

      $sHtml = "<ul class=\"catnav__list catnav__list_lev{$iLevel}".(($iColsNum>1) ? ' catnav__list_col'.$iColsNum : '')."\">";
      for ($i=1; $i<=$iColsNum; $i++) {

          if ($iColsNum>1) $sHtml .= '<li class="catnav__col"><ul class="catnav__col-list">';

          foreach ($aCats as $kkk => $vvv) {
              if ($iColsNum>1 && !($kkk >= $iColsItems*($i-1) && $kkk < $iColsItems*$i)) {
                  continue;
              }
              $sUrl = App::Get_Url('products.UsersCategoryView', array('name'=>$vvv['alias']), 'usr', false);
              $sSubCatsHtml = (($vvv['is_nested']) ? getCatsHtml($vvv['id'], $iLevel+1) : '');
              $sHtml .= "<li class=\"catnav__item".($sSubCatsHtml ? ' catnav__item_sub' : '').($iLevel==1 ? ' '.$vvv['alias'] : '')."\"><a class=\"catnav__link\" href=\"{$sUrl}\">{$vvv['title']}</a>".($iLevel==1 ? '<div class="catnav__bg"></div>' : '')."{$sSubCatsHtml}</li>";
          }

          if ($iColsNum>1) $sHtml .= '</ul></li>';
      }

      $sHtml .= '</ul>';
      return $sHtml;
  }*/

